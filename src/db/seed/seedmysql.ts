import { db } from "../db";
import { itinerary, users, articles, socialProfiles, notices } from "../schemamysql";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Iniciando el seeding con MySQL...");

  // 1. Limpieza total (orden correcto por FK)
  console.log("🧹 Limpiando tablas...");
  await db.delete(socialProfiles);
  await db.delete(notices);
  await db.delete(itinerary);
  await db.delete(articles);
  await db.delete(users);

  // 2. Preparar Bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash("password123", salt);

  // 3. Insertar Usuarios
  console.log("👤 Insertando usuarios...");
  await db.insert(users).values([
    { 
      username: "l20j45", 
      password: hashedPw, 
      fullName: "Daniel Rojas", 
      phone: "555-0101", 
      email: "daniel.rojas@escuela.com", 
      role: "COORDINADOR", 
      isAdmin: 1,
      bio: "Coordinador de tecnología con 10 años de experiencia."
    },
    { 
      username: "mgarcia", 
      password: hashedPw, 
      fullName: "Maria Garcia", 
      phone: "555-0103", 
      email: "m.garcia@gmail.com", 
      role: "PROFESOR", 
      isAdmin: 0,
      bio: "Profesora de desarrollo web y bases de datos."
    },
    { 
      username: "student_test", 
      password: hashedPw, 
      fullName: "Estudiante de Prueba", 
      phone: "555-9999", 
      email: "alumno@escuela.com", 
      role: "ALUMNO", 
      isAdmin: 0 
    },
  ]);

  // Obtener IDs (MySQL no soporta .returning())
  const insertedUsers = await db.select().from(users);

  // 4. Redes Sociales
  console.log("🔗 Insertando perfiles sociales...");
  await db.insert(socialProfiles).values([
    { userId: insertedUsers[0].id, platform: "GitHub", url: "https://github.com/jdoe" },
    { userId: insertedUsers[0].id, platform: "LinkedIn", url: "https://linkedin.com/in/jdoe" },
    { userId: insertedUsers[1].id, platform: "Twitter", url: "https://twitter.com/mgarcia" },
  ]);

  // 5. Itinerarios
  console.log("📅 Insertando itinerarios...");
  await db.insert(itinerary).values([
    { eventDate: "2026-06-24", eventTime: "09:00", title: "Bienvenida", description: "Inicio del ciclo escolar", icon: "🚀" },
    { eventDate: "2026-06-25", eventTime: "11:00", title: "Taller Drizzle", description: "Configuración de ORM en Node", icon: "🛠️" },
  ]);

  // 6. Artículos
  console.log("📰 Insertando artículos...");
  await db.insert(articles).values([
    { 
      title: "Guía de SQLite 2026", 
      slug: "guia-sqlite-2026",
      description: "Novedades en el motor ligero", 
      pubDate: "2026-03-01", 
      category: "Tecnología", 
      importance: 5, 
      content: "Contenido sobre SQLite...",
      image: null,
      isUrgent: 1
    },
    { 
      title: "Tips de Estudio", 
      slug: "tips-estudio",
      description: "Mejora tu productividad", 
      pubDate: "2026-03-10", 
      category: "Educación", 
      importance: 3, 
      content: "Contenido para alumnos...",
      image: null,
      isUrgent: 0
    },
  ]);

  // 7. Avisos
  console.log("🔔 Insertando avisos...");
  await db.insert(notices).values([
    { title: "Mantenimiento de Servidor", content: "El sistema estará fuera de línea este domingo.", priority: "high" },
    { title: "Nuevas Credenciales", content: "Ya pueden pasar por sus fotos para la credencial.", priority: "medium" },
    { title: "Club de Ajedrez", content: "Inscripciones abiertas en el patio central.", priority: "low" },
  ]);

  console.log("✅ Seeding completado exitosamente.");
}

seed().catch((err) => {
  console.error("❌ Error durante el seed:", err);
  process.exit(1);
});
