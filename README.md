Markdown
# 🇬🇧 UK Trip Wiki 2026 - Logistics & Social Platform

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Turso](https://img.shields.io/badge/Turso-4fd1c5?style=for-the-badge&logo=turso&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Plataforma de gestión logística y red social interna diseñada para el viaje de estudios a Londres 2026. Permite la coordinación en tiempo real entre profesores y alumnos, gestión de itinerarios, avisos de emergencia y perfiles sociales.

## 🚀 Características Principales

* **Autenticación Segura:** Manejo de sesiones con Cookies `httpOnly` y contraseñas encriptadas con `bcryptjs`.
* **Gestión de Roles:** Niveles de acceso diferenciados (`ALUMNO`, `PROFESOR`, `COORDINADOR`) controlados mediante Middleware en el Edge.
* **Itinerario Dinámico:** Publicación y actualización de actividades en tiempo real con zona horaria dual (GDL/LDN).
* **Cola de Avisos:** Sistema de mensajes prioritarios (High/Medium/Low) con capacidad de eliminación para el Staff.
* **Perfiles Sociales:** Relación 1:N para redes sociales y generación dinámica de **Códigos QR** para cada usuario.
* **Buscador de Compañeros:** Directorio con filtrado por nombre y visualización de roles.

## 🛠️ Stack Tecnológico

* **Framework:** [Astro](https://astro.build/) (SSR Mode)
* **Base de Datos:** [Turso](https://turso.tech/) (SQLite en el Edge)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **Estilos:** Tailwind CSS
* **Despliegue:** Netlify / Vercel

## 📂 Estructura del Proyecto

```text
src/
├── api/             # Endpoints (Auth, User Update, Notices, Itinerary)
├── components/      # UI Reutilizable (Header, NoticeBoard, UserQR)
├── db/              # Configuración de Turso y Esquemas de Drizzle
├── layouts/         # Plantillas base de la aplicación
├── middleware.ts    # Protección de rutas y gestión de locals
└── pages/           # Vistas SSR y Rutas Dinámicas ([username].astro)
⚙️ Configuración del Entorno
Clonar el repositorio:

Bash
git clone [https://github.com/tu-usuario/uk-trip-wiki.git](https://github.com/tu-usuario/uk-trip-wiki.git)
cd uk-trip-wiki
Instalar dependencias:

Bash
pnpm install
Variables de Entorno (.env):
Crea un archivo .env en la raíz con tus credenciales de Turso:

Fragmento de código
TURSO_URL=libsql://tu-db-url.turso.io
TURSO_TOKEN=tu_token_seguro
Sincronizar Base de Datos:

Bash
pnpm db:push
Correr en Desarrollo:

Bash
pnpm dev
🛡️ Comandos Útiles (DevOps)
pnpm db:generate: Genera los archivos de migración SQL.

pnpm db:push: Empuja los cambios del esquema directamente a Turso.

pnpm db:studio: Abre el panel administrativo local para gestionar datos.

📝 Notas de Implementación
Seguridad: El objeto Astro.locals.user se inyecta en el middleware, permitiendo acceso global a los datos del usuario logueado sin consultas redundantes.

QRs: Los códigos QR se generan mediante la API de QRServer, evitando dependencias pesadas en el cliente.

Timezones: El header utiliza Intl.DateTimeFormat con el timezone Europe/London para mantener a todo el grupo sincronizado con la hora local británica.