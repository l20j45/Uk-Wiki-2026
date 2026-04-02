import type { APIRoute } from "astro";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

export const DELETE: APIRoute = async ({ params, locals }) => {
  const { id } = params;
  const adminUser = locals.user;

  
  if (!adminUser || adminUser.isAdmin != 1) {
    return new Response(JSON.stringify({ message: "No autorizado" }), { status: 403 });
  }

  if (!id) {
    return new Response(JSON.stringify({ message: "ID requerido" }), { status: 400 });
  }

  try {
  
    await db.delete(users).where(eq(users.id, parseInt(id)));
    await cloudinary.uploader.destroy(`uk_wiki_2026/user_${id}`);
    return new Response(JSON.stringify({ message: "Usuario eliminado con éxito" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al eliminar" }), { status: 500 });
  }
};