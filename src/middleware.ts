import { defineMiddleware } from "astro:middleware";
import { db } from "./db/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isProtected = pathname.startsWith("/admin");
  const session = context.cookies.get("user_session");

  // 1. Si hay sesión, buscamos al usuario
  if (session) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, parseInt(session.value))
    });
    

    if (user) {

      context.locals.user = user;
      
      if (isProtected && user.isAdmin !== 1) {
        return context.redirect("/?error=not_admin");
      }
    } else {
     
      context.cookies.delete("user_session", { path: "/" });
      if (isProtected) return context.redirect("/login");
    }
  } 
  
  // 3. Si NO hay sesión y la ruta es protegida
  else if (isProtected) {
    return context.redirect("/login");
  }

  return next();
});