import type { APIRoute } from 'astro';
import {db} from '../../db/db';
import { itinerary } from '../../db/schema';

export const GET: APIRoute = async () => {
  const result = await db.select().from(itinerary);
  
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  // 1. Verificación de Seguridad (Capa Middleware/Locals)
//   const user = locals.user;
  
//   if (!user || (user.role !== 'PROFESOR' && user.role !== 'COORDINADOR')) {
//     return new Response(
//       JSON.stringify({ message: "No tienes permisos para editar el itinerario" }), 
//       { status: 403 }
//     );
//   }

  try {
    const data = await request.formData();
    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const eventDate = data.get("eventDate")?.toString(); // Formato YYYY-MM-DD
    const eventTime = data.get("eventTime")?.toString(); // Formato HH:MM
    const icon = data.get("icon")?.toString() || "📍";

    // 2. Validación básica
    if (!title || !eventDate || !eventTime) {
      return new Response(
        JSON.stringify({ message: "Título, fecha y hora son obligatorios" }), 
        { status: 400 }
      );
    }

    // 3. Inserción con Drizzle
    await db.insert(itinerary).values({
      title,
      description,
      eventDate,
      eventTime, // Asegúrate de tener este campo en tu schema.ts
      icon,
    });
    // Redirigir de vuelta al dashboard o al itinerario
    return redirect("/admin");

  } catch (error) {
    console.error("Error al postear itinerario:", error);
    return new Response(
      JSON.stringify({ message: "Error interno en la base de datos" }), 
      { status: 500 }
    );
  }
};