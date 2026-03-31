import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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
  name: text("name").notNull(),
  lastName: text("lastName").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  pubDate: text("pub_date").notNull(),
  category: text("category").notNull(),
  importance: integer("importance").notNull(),
  content: text("content").notNull(),
  // Nuevo campo: 0 para usuario normal, 1 para admin
  isAdmin: integer("is_admin").default(0).notNull(),
});
