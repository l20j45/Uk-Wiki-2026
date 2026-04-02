import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const user = locals.user;
  if (!user) return new Response("No autorizado", { status: 401 });

  const formData = await request.formData();
  const file = formData.get("avatar") as File;

  if (!file || file.size === 0) {
    return new Response("No se subió ningún archivo", { status: 400 });
  }

  try {
    // Convertir el archivo a Buffer para subirlo a Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir a Cloudinary usando una Promesa
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: "uk_wiki_2026", // Carpeta organizada
          public_id: `user_${user.id}`, // Sobreescribe si el usuario sube otra
          transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }] 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = (uploadResult as any).secure_url;

    // Guardar la URL en Turso
    await db.update(users)
      .set({ avatarUrl: imageUrl })
      .where(eq(users.id, user.id));

    return redirect("/perfil?success=avatar_updated");
  } catch (e) {
    console.error(e);
    return new Response("Error al subir imagen", { status: 500 });
  }
};