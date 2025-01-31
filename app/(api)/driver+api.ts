import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(
      "postgresql://flowdb_owner:1mxfwQhPl0MG@ep-still-glade-a2a1sxjx.eu-central-1.aws.neon.tech/flowdb?sslmode=require"
    );
    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
