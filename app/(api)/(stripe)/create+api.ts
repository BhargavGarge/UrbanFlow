import { Stripe } from "stripe";

const stripe = new Stripe(
  "sk_test_51QnKCySFbBQp9Ay50A9ZbtnqEtZ69vOrB5JZiUzBndxtG8CsGAtonQB55DvETXmzsd2Rcr5kOion5ZiXyKi5KQjN00F7HMAYTK"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, amount } = body;

    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    let customer;
    const existingCustomer = await stripe.customers.list({ email });

    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create({ name, email });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" } // ✅ Use a valid past version
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100, // ✅ Convert to cents
      currency: "usd",
      customer: customer.id,
    });

    console.log("🛠 Stripe Payment Intent Response:", paymentIntent); // ✅ Debugging

    if (!paymentIntent.client_secret) {
      console.error("🚨 Stripe Error: Missing client_secret in response");
      return new Response(
        JSON.stringify({ error: "Stripe did not return a client_secret" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        paymentIntent,
        ephemeralKey,
        customer: customer.id,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error creating payment intent:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
