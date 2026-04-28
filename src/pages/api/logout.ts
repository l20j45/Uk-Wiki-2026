// src/pages/api/logout.ts
import type { APIRoute } from "astro";

export const ALL: APIRoute = ({ cookies, redirect }) => {
  cookies.delete("user_session", {
    path: "/",
  });
  return redirect("/login?message=sesion_cerrada");
};