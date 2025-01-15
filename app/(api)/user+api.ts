import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(
      "postgresql://flowdb_owner:1mxfwQhPl0MG@ep-still-glade-a2a1sxjx.eu-central-1.aws.neon.tech/flowdb?sslmode=require"
    );
    const { name, email, clerkId } = await request.json();

    console.log("Received Data:", { name, email, clerkId }); // Debug log

    if (!name || !email || !clerkId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId}
      );
    `;
    console.log(
      `User created successfully: Name - ${name}, Email - ${email}, Clerk ID - ${clerkId}`
    ); // Success log

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error.message); // Debug log
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
