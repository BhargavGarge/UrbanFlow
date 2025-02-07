import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body); // ✅ Log request body

    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = body;

    if (
      !origin_address ||
      !destination_address ||
      !origin_latitude ||
      !origin_longitude ||
      !destination_latitude ||
      !destination_longitude ||
      !ride_time ||
      !fare_price ||
      !payment_status ||
      !driver_id ||
      !user_id
    ) {
      console.error("❌ Missing fields:", body); // ✅ Log missing fields
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("✅ All fields present. Sending query to DB...");

    const sql = neon(
      "postgresql://flowdb_owner:1mxfwQhPl0MG@ep-still-glade-a2a1sxjx.eu-central-1.aws.neon.tech/flowdb?sslmode=require"
    );

    const response = await sql`
      INSERT INTO rides ( 
          origin_address, 
          destination_address, 
          origin_latitude, 
          origin_longitude, 
          destination_latitude, 
          destination_longitude, 
          ride_time, 
          fare_price, 
          payment_status, 
          driver_id, 
          user_id
      ) VALUES (
          ${origin_address},
          ${destination_address},
          ${origin_latitude},
          ${origin_longitude},
          ${destination_latitude},
          ${destination_longitude},
          ${ride_time},
          ${fare_price},
          ${payment_status},
          ${driver_id},
          ${user_id}
      )
      RETURNING *;
    `;

    console.log("✅ Ride saved successfully:", response[0]); // ✅ Log inserted data
    return new Response(JSON.stringify({ data: response[0] }), { status: 201 });
  } catch (error) {
    console.error("❌ Error inserting data into rides:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
