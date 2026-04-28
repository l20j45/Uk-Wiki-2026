import type { APIRoute } from "astro";
import { db, itinerary } from "@db/index";

import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ params, locals }) => {
  const { id } = params;
  const adminUser = locals.user;

  if (!adminUser || adminUser.isAdmin != 1) {
    return new Response(JSON.stringify({ message: "No autorizado" }), { status: 403 });
  }

  try {
    await db.delete(itinerary).where(eq(itinerary.id, parseInt(id!)));
    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Error al borrar" }), { status: 500 });
  }
};