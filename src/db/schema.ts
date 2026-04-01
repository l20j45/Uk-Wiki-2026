import { relations } from "drizzle-orm/relations";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm"; // 👈 Importa esto

export const itinerary = sqliteTable("itinerary", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time"),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon").default("📍"),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  role: text("role").default("ALUMNO").notNull(), // 'ALUMNO', 'PROFESOR', 'COORDINADOR'
  isAdmin: integer("is_admin").default(0).notNull(),
  bio: text("bio"),
  bloodType: text("blood_type"), // Ej: A+
  allergies: text("allergies"),
  emergencyContact: text("emergency_contact"),
  avatarUrl: text("avatar_url").default("/img/default-avatar.png"),
  qrUrl: text("qr_url"),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  pubDate: text("pub_date").notNull(),
  category: text("category").notNull(),
  importance: integer("importance").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  isUrgent: integer("is_urgent").default(0).notNull(),
});

// Redes Sociales (1:N)
export const socialProfiles = sqliteTable("social_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
});

// Cola de Avisos
export const notices = sqliteTable("notices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  priority: text("priority").default("low"), // 'low', 'medium', 'high'
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// 3. DEFINIR LAS RELACIONES (Esto soluciona tu error)
export const usersRelations = relations(users, ({ many }) => ({
  socials: many(socialProfiles), // Esto le dice a Drizzle que "socials" existe
}));

export const socialProfilesRelations = relations(socialProfiles, ({ one }) => ({
  author: one(users, {
    fields: [socialProfiles.userId],
    references: [users.id],
  })


}));
