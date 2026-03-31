import type { APIRoute } from 'astro';
import {db} from '../../../db/db';
import { itinerary } from '../../../db/schema';

export const GET: APIRoute = async () => {



  const today = new Date().toISOString().split('T')[0];
  console.log("🚀 ~ GET ~ today:", today)

  const result = await db.$client.execute({
    sql: "SELECT * FROM itinerary WHERE event_date = ? ORDER BY event_time ASC",
    args: [today]
  });
  
  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};