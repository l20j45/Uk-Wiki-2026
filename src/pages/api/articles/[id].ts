import type { APIRoute } from "astro";
import { db } from "../../../db/db";
import { articles } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ params, locals }) => {
  const { id } = params;
  const user = locals.user;

  if (!user || user.isAdmin != 1) {
    return new Response(JSON.stringify({ message: "No autorizado" }), { status: 403 });
  }

  try {
    await db.delete(articles).where(eq(articles.id, parseInt(id!)));
    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Error al borrar artículo" }), { status: 500 });
  }
};