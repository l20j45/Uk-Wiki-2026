import type { APIRoute } from 'astro';
import {db} from '../../db/db';

export const GET: APIRoute = async ({ cookies }) => {
  const sessionId = cookies.get("user_session")?.value;

  if (!sessionId) return new Response(null, { status: 401 });


  const result = await db.$client.execute({
    sql: "SELECT username FROM users WHERE id = ?",
    args: [sessionId],
  });

  return new Response(JSON.stringify(result.rows[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};