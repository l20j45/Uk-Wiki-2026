import type { APIRoute } from "astro";
import { z } from "astro:schema";
import bcrypt from "bcrypt";
import { db } from "../../../db/db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

// Definimos el esquema fuera para validarlo manualmente
const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Verificación de sesión (Middleware de Astro)
    const userSession = locals.user;
    if (!userSession) {
      return new Response(JSON.stringify({ message: "No autorizado" }), { status: 401 });
    }

    // 2. Parsear y validar el body
    const body = await request.json();
    const result = ChangePasswordSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ 
        message: "Error de validación", 
        errors: result.error.flatten() 
      }), { status: 400 });
    }

    const { currentPassword, newPassword } = result.data;

    // 3. Buscar usuario en DB
    const userFound = await db
      .select()
      .from(users)
      .where(eq(users.id, userSession.id))
      .get();

    if (!userFound) {
      return new Response(JSON.stringify({ message: "Usuario no encontrado" }), { status: 404 });
    }

    // 4. Validar contraseña actual
    const isValid = await bcrypt.compare(currentPassword, userFound.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "La contraseña actual es incorrecta" }), { status: 400 });
    }

    // 5. Hashear y Actualizar
    const hashed = await bcrypt.hash(newPassword, 10);
    await db
      .update(users)
      .set({ password: hashed })
      .where(eq(users.id, userSession.id));

    return new Response(
      JSON.stringify({ success: true, message: "Contraseña actualizada correctamente" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
};