// import { defineMiddleware } from "astro:middleware";
// import { db } from "./db/db";
// import { users } from "./db/schema";
// import { eq } from "drizzle-orm";

// export const onRequest = defineMiddleware(async (context, next) => {
//   const isProtected = context.url.pathname.startsWith("/admin");
//   const session = context.cookies.get("user_session");
  
// if (session) {
//     const user = await db.query.users.findFirst({
//       where: eq(users.id, parseInt(session.value))
//     });

//     if (user) {
//         // Ahora TS reconocerá esta asignación sin errores
//         context.locals.user = user; 
//     }
// } else if (isProtected) {
//     return context.redirect("/login");
//   }

//   return next();
// });