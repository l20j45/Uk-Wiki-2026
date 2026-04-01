import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ locals, redirect }) => {
  const user = locals.user;
  if (!user) return new Response("No autorizado", { status: 401 });

  const profileUrl = `https://tu-wiki-uk-2026.netlify.app/user/${user.username}`;
  const qrSource = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}`;

  try {
    // Subimos a Cloudinary directamente desde la URL generada
    const uploadResult = await cloudinary.uploader.upload(qrSource, {
      folder: "uk_qr_codes",
      public_id: `qr_${user.username}`,
      overwrite: true,
    });

    const qrCloudinaryUrl = uploadResult.secure_url;

    // Guardamos en Turso
    await db.update(users)
      .set({ qrUrl: qrCloudinaryUrl })
      .where(eq(users.id, user.id));

    return redirect("/perfil?success=qr_generated");
  } catch (e) {
    return new Response("Error al generar QR", { status: 500 });
  }
};