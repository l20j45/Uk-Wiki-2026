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

  const mioPw = await bcrypt.hash("Pickner12.", salt);
  const pw = {
    Leonardo: await bcrypt.hash("Leonardo2026!", salt),
    Francisco: await bcrypt.hash("Francisco2026!", salt),
    Rocio: await bcrypt.hash("Rocio2026!", salt),
    Mauro: await bcrypt.hash("Mauro2026!", salt),
    Marco: await bcrypt.hash("Marco2026!", salt),
    Ana: await bcrypt.hash("Ana2026!", salt),
    Andrea: await bcrypt.hash("Andrea2026!", salt),
    Alan: await bcrypt.hash("Alan2026!", salt),
    Dalia: await bcrypt.hash("Dalia2026!", salt),
    Yaneth: await bcrypt.hash("Yaneth2026!", salt),
    Angel: await bcrypt.hash("Angel2026!", salt),
    Manuel: await bcrypt.hash("Manuel2026!", salt),
    Dariana: await bcrypt.hash("Dariana2026!", salt),
    Jesus: await bcrypt.hash("Jesus2026!", salt),
    Lusi: await bcrypt.hash("Lusi2026!", salt),
    Daniel: await bcrypt.hash("Daniel2026!", salt),
    Alejandra: await bcrypt.hash("Alejandra2026!", salt),
    Maria: await bcrypt.hash("Maria2026!", salt),
    Monserrat: await bcrypt.hash("Monserrat2026!", salt),
  };

  // 3. Inserción de Usuarios
  console.log("👤 Insertando usuarios...");
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        username: "l20j45",
        password: mioPw,
        fullName: "daniel Rojas",
        phone: "3318231058",
        email: "daniel.rojas.artiaga@gmail.com",
        role: "ADMIN",
        isAdmin: 1,
        bio: "Profesor adjunto, y entusiasta del codigo libre, y muchas cosas",
      },
      {
        username: "Leonardo",
        password: pw.Leonardo,
        fullName: "Leonardo Soto",
        phone: "",
        email: "",
        role: "ADMIN",
        isAdmin: 1,
        bio: "",
      },
      {
        username: "Francisco",
        password: pw.Francisco,
        fullName: "Francisco Hernández",
        phone: "",
        email: "",
        role: "ADMIN",
        isAdmin: 1,
        bio: "",
      },
      {
        username: "Mauro",
        password: pw.Mauro,
        fullName: "Mauro Rodríguez",
        phone: "",
        email: "",
        role: "ADMIN",
        isAdmin: 1,
        bio: ""
      },
      {
        username: "marco",
        password: pw.Marco,
        fullName: "Marco Eli Contreras Bernal",
        phone: "",
        email: "marco.contreras2059@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "ana.contreras",
        password: pw.Ana,
        fullName: "Ana Sofia Contreras Bernal",
        phone: "",
        email: "ana.contreras7505@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "andrea.mireles",
        password: pw.Andrea,
        fullName: "Andrea Mireles Caro",
        phone: "",
        email: "andrea.mireles0416@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "anapaula.cuervo",
        password: pw.Ana,
        fullName: "Ana Paula Cuervo",
        phone: "",
        email: "anapaula.cuervo7164@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "alan.verastegui",
        password: pw.Alan,
        fullName: "Alan Antonio Verastegui Luna",
        phone: "",
        email: "",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "dalia.calderon",
        password: pw.Dalia,
        fullName: "Dalia Paulina Calderón Antón",
        phone: "",
        email: "dalia.calderon@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "yaneth.flores",
        password: pw.Yaneth,
        fullName: "Yaneth Arellys Flores Torres",
        phone: "",
        email: "yaneth.flores7825@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "angel.yael",
        password: pw.Angel,
        fullName: "Ángel Yael Tejeda Castellanos",
        phone: "",
        email: "aytc7225@gmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "manuel.lopez",
        password: pw.Manuel,
        fullName: "Manuel López Arredondo",
        phone: "",
        email: "lasallistasconvalores@gmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "dariana.garcia",
        password: pw.Dariana,
        fullName: "Dariana Valeria Garcia Ruvalcaba",
        phone: "",
        email: "dariana.garcia0636@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "andrea.reynaga",
        password: pw.Andrea,
        fullName: "Andrea Reynaga",
        phone: "",
        email: "andreareynaga978@gmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "jesus.martinez",
        password: pw.Jesus,
        fullName: "Jesús Santiago Martínez Velarde",
        phone: "",
        email: "jesus.martinez4398@alumnos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "lusi.maciel",
        password: pw.Lusi,
        fullName: "Lusi Alberto Maciel Arellano",
        phone: "",
        email: "lmacielgdl@gmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "daniel.rojas",
        password: pw.Daniel,
        fullName: "Daniel Rojas Artiaga",
        phone: "",
        email: "daniel.rojas.artiaga@gmail.com",
        role: "ADMIN",
        isAdmin: 1,
        bio: "",
      },
      {
        username: "alejandra.cendejas",
        password: pw.Alejandra,
        fullName: "Alejandra Cendejas Guillén",
        phone: "",
        email: "acendejasguillen@hotmail.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "maria.aparicio",
        password: pw.Maria,
        fullName: "María Fernanda Aparicio López",
        phone: "",
        email: "maferefam@yahoo.com",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "jesus.antonio",
        password: pw.Jesus,
        fullName: "Jesús Antonio Martínez Velarde",
        phone: "",
        email: "",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
      },
      {
        username: "monserrat.granillo",
        password: pw.Monserrat,
        fullName: "Monserrat Granillo Garrido",
        phone: "",
        email: "monsserat.granillo@academicos.udg.mx",
        role: "ALUMNO",
        isAdmin: 0,
        bio: "",
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
      description:
        "Llegada a londres y asignacion de habitacion en la residencia",
      icon: "🏠",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-29",
      eventTime: "08:00",
      finishTime: "12:00",
      title: "Bienvenida y recepción por parte del Prof. Mauro Giles",
      description:
        "Fundamentos de la Administración de Proyectos, preparación visita al Kings College Hospital",
      icon: "💻",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-29",
      eventTime: "15:00",
      finishTime: "21:00",
      title: "Visita libre en Londres",
      description: "Recomendación visitar Big Ben, famoso reloj de Londres",
      icon: "⏰",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-30",
      eventTime: "08:00",
      finishTime: "09:30",
      title: "Salida hacia Kings College Hospital",
      description:
        "Conferencias sobre actividades del hospital utilizando project manager con IA",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-30",
      eventTime: "09:30",
      finishTime: "13:00",
      title: "Bienvenida en Kings College Hospital",
      description: "Conferencias y visita al helipuerto del hospital",
      icon: "🌈",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-06-30",
      eventTime: "13:30",
      finishTime: "23:00",
      title: "Visita libre por la tarde en Londres",
      description: "Museo de ciencias, museo británico, etc",
      icon: "🌈",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-01",
      eventTime: "09:00",
      finishTime: "13:00",
      title: "Curso en salón de clases",
      description: "Reflexiones y estándares de metodologías",
      icon: "🎪",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-01",
      eventTime: "15:00",
      finishTime: "21:00",
      title: "Salida libre a Londres",
      description: "Hyde Park, Piccadilly Circus",
      icon: "🎪",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-02",
      eventTime: "08:00",
      finishTime: "14:00",
      title: "Curso salón de clases",
      description: "Planeación del Proyecto con MS Project",
      icon: "🌈",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-03",
      eventTime: "08:00",
      finishTime: "14:00",
      title: "Salida a Trinity College Library",
      description: "Visita a Rusking College y biblioteca famosa",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-03",
      eventTime: "14:00",
      finishTime: "21:00",
      title: "Visita libre en Cambridge City",
      description: "Recomendaciones del Prof. Mauro Giles",
      icon: "🎪",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-04",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Día libre para visitas",
      description: "Bath, Stonehenge, Palacio de Buckingham",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-05",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Día libre para visitas",
      description: "Visitar Londres y alrededores",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-06",
      eventTime: "09:00",
      finishTime: "13:00",
      title: "Curso salón de usos múltiples",
      description: "IA aplicada a proyectos",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-06",
      eventTime: "15:00",
      finishTime: "21:00",
      title: "Visita libre",
      description: "Greenwich, museos, Notting Hill",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-07",
      eventTime: "09:00",
      finishTime: "12:00",
      title: "Curso salón de usos múltiples",
      description: "IA + MS Project",
      icon: "🤖",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-07",
      eventTime: "13:00",
      finishTime: "21:00",
      title: "Salida libre",
      description: "Buckingham Palace",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-08",
      eventTime: "09:00",
      finishTime: "12:00",
      title: "Curso salón de usos múltiples",
      description: "Gestión avanzada y proyecto final",
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
      eventTime: "15:00",
      finishTime: "21:00",
      title: "Visita libre a Londres",
      description: "pending",
      icon: "🚀",
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
      title: "Finalización del curso",
      description: "pending",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-11",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Paris",
      description: "Torre Eiffel, Trocadero, Arco del Triunfo",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
    {
      eventDate: "2026-07-12",
      eventTime: "08:00",
      finishTime: "21:00",
      title: "Paris",
      description: "Notre Dame, Museo del Louvre, Campos Elíseos, Sacre Coeur",
      icon: "🚀",
      location: "pending",
      onlyAdmins: 0,
    },
  ]);

  // 6. Inserción de Artículos
  console.log("📰 Insertando artículos...");
  await db.insert(articles).values([
    {
      title: "Tu hogar en Inglaterra: University of Hertfordshire",
      description:
        "Detalles sobre las habitaciones, servicios y ubicación del campus.",
      pubDate: "2026-03-29",
      category: "Logística",
      importance: 5,
      content: `# 🏠 Alojamiento en el Campus

Nos hospedaremos en el **Campus De Havilland**, diseñado para ofrecer la mejor experiencia estudiantil.

* **Habitaciones:** Individuales con baño privado.
* **Servicios incluidos:**
    * Internet de alta velocidad (Wi-Fi).
    * Cuarto de lavado (Laundry room).
    * Áreas comunes para estudio y convivencia.
* **Ubicación:** Hatfield, Hertfordshire (a unos 25-30 minutos de la estación King's Cross en Londres vía tren rápido).

**Tip:** La universidad cuenta con un Sports Village de clase mundial. Si te gusta el ejercicio, ¡aprovéchalo!

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9878.833237027538!2d-0.2543249581636652!3d51.75665719993579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763c7a2d02919d%3A0xa01d8213ed774822!2sUniversity%20of%20Hertfordshire%20de%20Havilland%20Campus!5e0!3m2!1ses!2smx!4v1776450857800!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
      slug: "tu-hogar-en-inglaterra-university-of-hertfordshire",
      image: "",
      isUrgent: 0,
    },
    {
      title: "Kit Digital del Viajero",
      description:
        "Las aplicaciones que debes tener instaladas antes de subir al avión.",
      pubDate: "2026-04-02",
      category: "tecnico",
      importance: 10,
      content: `# 📲 Tu celular es tu mejor herramienta

Para las clases de **Applied AI** y para la logística del viaje, descarga estas apps:

* **Académico:** Microsoft Teams (para avisos) y Microsoft Project Viewer.
* **Finanzas:** **Revolut** o **Wise**.
* **Transporte:**
    * **Citymapper**
    * **Trainline**
    * **Uber / Bolt**
* **Traducción:** Google Translate (descarga el paquete offline).`,
      slug: "kit-digital-del-viajero",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Preparación: Clima y Vestimenta",
      description:
        "Qué empacar para el impredecible clima inglés de junio/julio.",
      pubDate: "2026-06-15",
      category: "logistica",
      importance: 11,
      content: `# 🌦️ Consejos para el Clima

Basado en la **diapositiva 4** de nuestra presentación de logística:

1. **Capas (Layers)**
2. **Impermeable**
3. **Calzado:** Caminaremos 10-12km diarios.

> **Nota:** Revisen el canal de Discord cada mañana.`,
      slug: "preparacion-clima-y-vestimenta",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Verano Académico 2026: Inteligencia Artificial en Londres",
      description:
        "Todo lo que necesitas saber sobre el curso Applied AI in Project Management.",
      pubDate: "2026-03-26",
      category: "General",
      importance: 1,
      content: `# 🚀 Un paso hacia el futuro: IA en la Gestión de Proyectos

Este verano, la **Universidad de Guadalajara** te invita a participar en un curso internacional.

### Datos Clave
* **Fechas:** 29 junio – 11 julio 2026
* **Sede:** University of Hertfordshire
* **Idioma:** Español e Inglés
* **Certificación:** Diploma oficial

### Módulos
1. Fundamentos
2. MS Project
3. IA aplicada
4. Proyecto final`,
      slug: "verano-academico-2026-inteligencia-artificial-en-londres",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Guía de Supervivencia: Comida y Despensa",
      description:
        "Presupuesto diario para alimentos y dónde comprar cerca del campus.",
      pubDate: "2026-03-31",
      category: "logistica",
      importance: 12,
      content: `# 🍎 Alimentación en Hatfield

* **Presupuesto:** £20–£30 diarios
* **Ahorro:** Comprar en supermercados
* **Tiendas:** Tesco, ASDA, Pret, Greggs
* **Tip:** The Galleria tiene muchas opciones.`,
      slug: "guia-de-supervivencia-comida-y-despensa",
      image: "",
      isUrgent: 0,
    },
    {
      title: "Extensión Académica: Londres a París",
      description: "Detalles del viaje en el Eurostar y actividades en París.",
      pubDate: "2026-03-31",
      category: "academico",
      importance: 13,
      content: `# 🗼 Rumbo a París

* **Transporte:** Eurostar (2.5h)
* **Llegada:** Gare du Nord
* **Pase:** Navigo
* **Actividades:** Museos, recorridos históricos

> Desde £73 si compras con anticipación.`,
      slug: "extension-academica-londres-a-paris",
      image: "",
      isUrgent: 0,
    },
    {
      title: "Historia de Londres",
      description: "Desde la Londinium romana hasta la metrópolis moderna.",
      pubDate: "2026-06-15",
      category: "logistica",
      importance: 7,
      content: `# 🏛️ Historia de Londres

* **43 d.C.:** Fundación de Londinium
* **1666:** Gran incendio
* **Siglo XIX:** Revolución Industrial

> La City mantiene trazado medieval.`,
      slug: "historia-de-londres",
      image: "",
      isUrgent: 1,
    },
    {
      title:
        "Verano Académico 2026: Inteligencia Artificial en Londres - Segunda Parte",
      description: "Segunda parte del curso Applied AI.",
      pubDate: "2026-03-26",
      category: "academico",
      importance: 14,
      content: `# 🚀 IA en la Gestión de Proyectos (Parte 2)

Incluye los mismos módulos:
1. Fundamentos
2. MS Project
3. IA aplicada
4. Proyecto final`,
      slug: "verano-academico-2026-inteligencia-artificial-en-londres-2",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Internet y Telefonía en UK",
      description: "Cómo mantenerte conectado sin pagar roaming.",
      pubDate: "2026-04-01",
      category: "tecnico",
      importance: 15,
      content: `# 📱 Datos móviles en el extranjero

1. **SIM:** giffgaff, LycaMobile, EE
2. **eSIM:** Airalo, Holafly
3. **Importante:** Asegura que tu celular esté liberado.`,
      slug: "internet-y-telefonia-en-uk",
      image: "",
      isUrgent: 0,
    },
    {
      title: "📍 Mapa de Referencia: UK & París",
      description: "Ubicaciones clave del programa.",
      pubDate: "2026-04-03",
      category: "logistica",
      importance: 16,
      content: `# 🗺️ Lugares que debes conocer

Incluye:
- Campus De Havilland
- Hatfield Station
- Kings College Hospital
- Bletchley Park
- Gare du Nord
- Punto Navigo`,
      slug: "mapa-de-referencia-uk-y-paris",
      image: "",
      isUrgent: 1,
    },
    {
      title: "🧳 Qué empacar: Guía de Equipaje",
      description: "Adaptadores, ropa, dress code y gadgets.",
      pubDate: "2026-04-04",
      category: "logistica",
      importance: 17,
      content: `# 📦 Preparando la Maleta

Incluye:
- Dress code
- Capas
- Adaptadores tipo G y E/F
- Power bank
- Calzado cómodo`,
      slug: "que-empacar-guia-de-equipaje",
      image: "",
      isUrgent: 0,
    },
    {
      title: "Normas de Conducta y Seguridad",
      description: "Reglas del programa y protocolos.",
      pubDate: "2026-03-29",
      category: "logistica",
      importance: 18,
      content: `# 🛡️ Seguridad y Convivencia

* Puntualidad
* Respeto
* Buddy system
* Alcohol prohibido

> Teléfonos de emergencia incluidos.`,
      slug: "normas-de-conducta-y-seguridad",
      image: "",
      isUrgent: 1,
    },
    {
      title: "🏥 Visita Especial: NHS King's College Hospital",
      description: "Protocolo, vestimenta y objetivos académicos.",
      pubDate: "2026-04-05",
      category: "academico",
      importance: 19,
      content: `# 🩺 Inmersión en el NHS

Incluye:
- Dress code estricto
- Objetivos académicos
- Reglas de fotografía y puntualidad`,
      slug: "visita-especial-nhs-kings-college-hospital",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Guía de Transporte: De Heathrow a la Universidad",
      description: "Apps recomendadas y uso de Oyster/Navigo.",
      pubDate: "2026-03-28",
      category: "logistica",
      importance: 4,
      content: `# 🚇 Moviéndote como un local

Rutas desde Heathrow y Luton.
Apps: Tube Map, RATP, Google Maps.
Tips: Oyster y Navigo.`,
      slug: "guia-de-transporte-de-heathrow-a-la-universidad",
      image: "",
      isUrgent: 0,
    },
    {
      title: "Inversión y Proceso de Pago",
      description: "Costos, fechas y lo que incluye.",
      pubDate: "2026-03-27",
      category: "logistica",
      importance: 2,
      content: `# 💰 Planifica tu inversión

Costo total: £1,950
Pagos: 4 parcialidades
Incluye alojamiento y clases.`,
      slug: "inversion-y-proceso-de-pago",
      image: "",
      isUrgent: 1,
    },
    {
      title: "Check-list: ¿Qué documentos necesito?",
      description: "Documentos legales y de salud.",
      pubDate: "2026-03-30",
      category: "logistica",
      importance: 2,
      content: `# 📑 Documentos Indispensables

Incluye:
- Pasaporte
- Seguro médico
- Carta de aceptación
- Comprobantes de pago
- Fotos carnet`,
      slug: "check-list-que-documentos-necesito",
      image: "",
      isUrgent: 1,
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
