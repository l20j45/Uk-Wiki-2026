import { db } from "../db";
import { itinerary, users, articles, socialProfiles, notices } from "../schema";
import * as bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Iniciando el seeding con el nuevo esquema...");

  // 1. Limpieza total de la base de datos
  // El orden importa por las llaves foráneas (borramos primero las tablas dependientes)
  console.log("🧹 Limpiando tablas...");
  await db.delete(socialProfiles);
  await db.delete(notices);
  await db.delete(users);
  await db.delete(itinerary);
  await db.delete(articles);

  // 2. Preparar Bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash("n$cpF#6M02%Xq$", salt);
  const hashedPw2 = await bcrypt.hash("123456", salt);

  // 3. Inserción de Usuarios
  console.log("👤 Insertando usuarios...");
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        username: "l20j45",
        password: hashedPw,
        fullName: "daniel Rojas",
        phone: "3318231058",
        email: "daniel.rojas.artiaga@gmail.com",
        role: "ADMIN",
        isAdmin: 1,
        bio: "Profesor adjunto, y entusiasta del codigo libre, y muchas cosas",
      },
      {
        username: "alumnoTest",
        password: hashedPw2,
        fullName: "alumnoTest",
        phone: "alumnoTest",
        email: "m.garcia@gmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "Alumno test.",
      },
    ])
    .returning({ id: users.id }); // Obtenemos los IDs para las relaciones

  // 5. Inserción de Itinerarios
  console.log("📅 Insertando itinerarios...");
  await db.insert(itinerary).values([
    {
      eventDate: "2026-06-28",
      eventTime: "00:00",
      finishTime: "23:59",
      title: "Instalacion de residencia en londres",
      description: "Llegada a lon res y asignacion de habitacion",
      icon: "🏠",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-29",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Bienvenida",
      description: "Inicio de curso en Londres",
      icon: "💻",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-29",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Big Ben",
      description: "Visita al famoso reloj de Londres",
      icon: "⏰",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-30",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-30",
      eventTime: "12:00",
      finishTime: "21:00",
      title: "London Eye British Museum",
      description: "Visita a la famosa rueda de Londres",
      icon: "🌉",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-01",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-01",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Hyde Park. Piccadicilly Circus",
      description: "pending",
      icon: "🎪",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-02",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-02",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "London Bridge",
      description: "pending",
      icon: "🌉",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-03",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-03",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Museo 9 3/4 harry Potter",
      description: "pending",
      icon: "🎪",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-04",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Edimburgo",
      description: "Dias libres propuestos para visitar la ciudad de Edimburgo",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-05",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Brujas, Belgica",
      description: "Dias libres propuestos para visitar la ciudad de Brujas",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-06",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-06",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Greenwich",
      description: "pending",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-07",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-07",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Buckingham Palace",
      description: "pending",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-08",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
        {
      eventDate: "2026-07-08",
      eventTime: "12:00",
      finishTime: "13:00",
      title: "Conferencia",
      description: "Conferencia",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-08",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Trinity College Cambridge",
      description: "pending",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-09",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-09",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "South Kensington",
      description: "pending",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-10",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Curso",
      description: "Curso de project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-10",
      eventTime: "12:00",
      finishTime: "13:00",
      title: "Finalizacion del curso",
      description: "pending",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-11",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Paris",
      description: "Torre Eiffel, Trocadero, Arco del Triunfo",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-12",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Paris",
      description: "Notre Dame, Museo del Louvre, Campos eliseos, Sacre Coeur",
      icon: "🛠️",
      location: "pending",
      onlyAdmins: 0,
    }
  ]);

  // 6. Inserción de Artículos
  console.log("📰 Insertando artículos...");
  await db.insert(articles).values([
    {
      title: "Guía de SQLite 2026",
      description: "Novedades en el motor ligero",
      pubDate: "2026-03-01",
      category: "Tecnología",
      importance: 5,
      content: "Contenido sobre SQLite...",
      slug: "guia-sqlite-2026",
    },
    {
      title: "Tips de Estudio",
      description: "Mejora tu productividad",
      pubDate: "2026-03-10",
      category: "Educación",
      importance: 3,
      content: "Contenido para alumnos...",
      slug: "tips-estudio",
    },
  ]);

  // 7. Inserción de Avisos (Notices)
  console.log("🔔 Insertando avisos...");
  await db.insert(notices).values([
    {
      title: "Mantenimiento de Servidor",
      content: "El sistema estará fuera de línea este domingo.",
      priority: "high",
    },
    {
      title: "Nuevas Credenciales",
      content: "Ya pueden pasar por sus fotos para la credencial.",
      priority: "medium",
    },
    {
      title: "Club de Ajedrez",
      content: "Inscripciones abiertas en el patio central.",
      priority: "low",
    },
  ]);

  console.log("✅ Seeding completado exitosamente.");
}

seed().catch((err) => {
  console.error("❌ Error durante el seed:", err);
  process.exit(1);
});
