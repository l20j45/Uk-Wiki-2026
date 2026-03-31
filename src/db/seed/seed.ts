import { db } from "../db";
import { itinerary, users, articles } from "../schema";

async function seed() {
  console.log("🌱 Iniciando el seeding...");

  // 1. Seed para la tabla 'users'
  console.log("Inserción de usuarios...");
  await db.insert(users).values([
    { username: "jdoe", password: "hash_password_1", name: "John", lastName: "Doe", phone: "555-0101", email: "john@example.com", isAdmin: 1 },
    { username: "asmith", password: "hash_password_2", name: "Alice", lastName: "Smith", phone: "555-0102", email: "alice@example.com", isAdmin: 1 },
    { username: "mgarcia", password: "hash_password_3", name: "Maria", lastName: "Garcia", phone: "555-0103", email: "m.garcia@gmail.com", isAdmin: 0 },
    { username: "rwilson", password: "hash_password_4", name: "Robert", lastName: "Wilson", phone: "555-0104", email: "robert.w@outlook.com", isAdmin: 0 },
    { username: "clopez", password: "hash_password_5", name: "Carlos", lastName: "Lopez", phone: "555-0105", email: "clopez@empresa.com", isAdmin: 0 },
    { username: "emiller", password: "hash_password_6", name: "Emily", lastName: "Miller", phone: "555-0106", email: "emily.m@tech.com", isAdmin: 0 },
    { username: "dchen", password: "hash_password_7", name: "David", lastName: "Chen", phone: "555-0107", email: "dchen@service.io", isAdmin: 0 },
    { username: "smartinez", password: "hash_password_8", name: "Sofia", lastName: "Martinez", phone: "555-0108", email: "sofia.m@web.com", isAdmin: 0 },
    { username: "jbrown", password: "hash_password_9", name: "James", lastName: "Brown", phone: "555-0109", email: "jbrown@domain.com", isAdmin: 0 },
    { username: "lharris", password: "hash_password_10", name: "Linda", lastName: "Harris", phone: "555-0110", email: "linda.h@info.net", isAdmin: 0 },
  ]);

  // 2. Seed para la tabla 'itinerary'
  console.log("Inserción de itinerarios...");
  await db.insert(itinerary).values([
    { eventDate: "2024-05-20", eventTime: "09:00", title: "Reunión de Apertura", description: "Bienvenida a los nuevos empleados", icon: "👋" },
    { eventDate: "2024-05-20", eventTime: "11:30", title: "Workshop Técnico", description: "Introducción a Drizzle y SQLite", icon: "💻" },
    { eventDate: "2024-05-21", eventTime: "13:00", title: "Almuerzo Networking", description: "Restaurante Central", icon: "🍴" },
    { eventDate: "2024-05-21", eventTime: "15:00", title: "Presentación de Q2", description: "Resultados del segundo trimestre", icon: "📊" },
    { eventDate: "2024-05-22", eventTime: "10:00", title: "Sesión de Yoga", description: "Actividad recreativa en el jardín", icon: "🧘" },
    { eventDate: "2024-05-22", eventTime: "16:00", title: "Cierre del Evento", description: "Entrega de reconocimientos", icon: "🏆" },
    { eventDate: "2024-05-23", eventTime: "08:30", title: "Desayuno Ejecutivo", description: "Solo para directiva", icon: "☕" },
    { eventDate: "2024-05-24", eventTime: "12:00", title: "Check-out Hotel", description: "Salida de la sede principal", icon: "🏨" },
    { eventDate: "2024-05-25", eventTime: "09:00", title: "Vuelo de Regreso", description: "Confirmar terminal 4", icon: "✈️" },
    { eventDate: "2024-05-26", eventTime: "10:00", title: "Revisión de Feedback", description: "Análisis de encuestas", icon: "📝" },
  ]);

  // 3. Seed para la tabla 'articles'
  console.log("Inserción de artículos...");
  await db.insert(articles).values([
    { title: "Novedades en SQLite 2024", description: "Resumen de las últimas funciones", pubDate: "2024-01-15", category: "Tecnología", importance: 5, content: "Contenido extenso sobre bases de datos..." },
    { title: "Mejorando el SEO", description: "Tips básicos para visibilidad", pubDate: "2024-01-20", category: "Marketing", importance: 3, content: "Contenido sobre palabras clave y meta tags..." },
    { title: "Dieta Saludable en el Trabajo", description: "Cómo comer mejor en la oficina", pubDate: "2024-02-05", category: "Salud", importance: 2, content: "Contenido sobre snacks saludables y nutrición..." },
    { title: "TypeScript Avanzado", description: "Tipado complejo y genéricos", pubDate: "2024-02-12", category: "Programación", importance: 4, content: "Guía completa de tipos avanzados..." },
    { title: "Viajes post-pandemia", description: "Los destinos más buscados", pubDate: "2024-02-28", category: "Viajes", importance: 3, content: "Tendencias actuales del turismo mundial..." },
    { title: "Finanzas Personales", description: "Ahorra tu primer millón", pubDate: "2024-03-01", category: "Finanzas", importance: 5, content: "Métodos de inversión y ahorro consciente..." },
    { title: "Nuevos Frameworks CSS", description: "Más allá de Tailwind", pubDate: "2024-03-10", category: "Tecnología", importance: 2, content: "Análisis de Open Props y Panda CSS..." },
    { title: "Liderazgo Empático", description: "Cómo gestionar equipos remotos", pubDate: "2024-03-15", category: "RRHH", importance: 4, content: "Estrategias de comunicación asertiva..." },
    { title: "Inteligencia Artificial", description: "Impacto en el desarrollo de software", pubDate: "2024-03-22", category: "Tecnología", importance: 5, content: "Análisis sobre Copilot y modelos LLM..." },
    { title: "Decoración Minimalista", description: "Menos es más en tu hogar", pubDate: "2024-04-01", category: "Estilo de Vida", importance: 1, content: "Ideas para organizar espacios pequeños..." },
  ]);

  console.log("✅ Seeding completado con éxito.");
}

seed().catch((err) => {
  console.error("❌ Error en el seeding:", err);
  process.exit(1);
});