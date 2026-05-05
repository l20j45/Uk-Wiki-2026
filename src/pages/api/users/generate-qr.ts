import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";
import { db,users } from "@db/index";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ locals, redirect }) => {

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});


  const user = locals.user;
  if (!user) return new Response("No autorizado", { status: 401 });

  const profileUrl = `https://uk2026gdl.netlify.app/user/${user.username}`;
  const qrSource = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}`;

  try {
    
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