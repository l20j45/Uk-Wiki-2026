import type { APIRoute } from "astro";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // <--- Importamos bcrypt

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username || !password) {
      return new Response(JSON.stringify({ message: "Campos incompletos" }), {
        status: 400,
      });
    }

    // 1. Buscamos al usuario en Turso
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    // 2. Si el usuario existe, comparamos los hashes
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // 3. Login Exitoso: Creamos la cookie

        cookies.set("user_session", user.id.toString(), {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
        });
        cookies.set("isAdmin", user.isAdmin === 1 ? "true" : "false", {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
        });

        // Enviamos el flag de admin en la respuesta
        return new Response(
          JSON.stringify({
            message: "Acceso concedido",
            isAdmin: !!user.isAdmin, // Convertimos a booleano
          }),
          { status: 200 },
        );
      }
    }

    // Si no existe o la contraseña no coincide, devolvemos un error genérico
    // (Por seguridad no decimos específicamente cuál falló)
    return new Response(JSON.stringify({ message: "Credenciales inválidas" }), {
      status: 401,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error en el servidor" }), {
      status: 500,
    });
  }
};
