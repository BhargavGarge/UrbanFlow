import { Stripe } from "stripe";

const stripe = new Stripe(
  "sk_test_51QnKCySFbBQp9Ay50A9ZbtnqEtZ69vOrB5JZiUzBndxtG8CsGAtonQB55DvETXmzsd2Rcr5kOion5ZiXyKi5KQjN00F7HMAYTK"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment_method_id, payment_intent_id, customer_id } = body;

    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({ error: "Missing required payment info" }),
        { status: 400 }
      );
    }

    // Retrieve Payment Intent Status
    const paymentIntent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status !== "requires_payment_method") {
      return new Response(
        JSON.stringify({
          error: "Payment Intent is not in a valid state for confirmation",
          currentStatus: paymentIntent.status,
        }),
        { status: 400 }
      );
    }

    // Attach the payment method
    await stripe.paymentMethods.attach(payment_method_id, {
      customer: customer_id,
    });

    // Confirm the payment
    const confirmedIntent = await stripe.paymentIntents.confirm(
      payment_intent_id,
      {
        payment_method: payment_method_id,
      }
    );

    // Handle authentication requirements
    if (confirmedIntent.status === "requires_action") {
      return new Response(
        JSON.stringify({
          success: false,
          requiresAction: true,
          nextAction: confirmedIntent.next_action,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        result: confirmedIntent,
        message: "Payment Confirmed",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error processing payment:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message || "Unknown error",
      }),
      { status: 500 }
    );
  }
}
