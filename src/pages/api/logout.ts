// src/pages/api/logout.ts
import type { APIRoute } from "astro";

export const ALL: APIRoute = ({ cookies, redirect }) => {
  // 1. Eliminamos la cookie de sesión
  // Al poner 'maxAge: 0' o una fecha pasada, el navegador la borra inmediatamente
  cookies.delete("user_session", {
    path: "/",
  });

  // 2. Redirigimos al usuario a la página de inicio o al login
  return redirect("/login?message=sesion_cerrada");
};