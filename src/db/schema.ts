import type { number } from "astro:schema";
import { relations } from "drizzle-orm/relations";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const itinerary = sqliteTable("itinerary", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time").notNull(),
  finishTime: text("finished"),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon").default("📍"),
  location: text("location"),
  onlyAdmins: integer("only_admins").default(0).notNull()
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  email: text("email"),
  role: text("role").default("ALUMNO").notNull(), // 'ALUMNO', 'PROFESOR', 'COORDINADOR'
  isAdmin: integer("is_admin").default(0).notNull(),
  bio: text("bio"),
  bloodType: text("blood_type"), // Ej: A+
  allergies: text("allergies"),
  extraInfo: text("extra_info"),
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

export const socialProfiles = sqliteTable("social_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
});

export const emergencyContacts = sqliteTable("emergency_contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  number: text("number").notNull(),
});


export const notices = sqliteTable("notices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  priority: text("priority").default("low"), // 'low', 'medium', 'high'
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});


export const usersRelations = relations(users, ({ many }) => ({
  socials: many(socialProfiles),
  emergencyContacts: many(emergencyContacts),
}));


export const socialProfilesRelations = relations(socialProfiles, ({ one }) => ({
  author: one(users, {
    fields: [socialProfiles.userId],
    references: [users.id],
  }),
}));


export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  author: one(users, {
    fields: [emergencyContacts.userId],
    references: [users.id],
  }),
}));
