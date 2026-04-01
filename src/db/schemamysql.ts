import { mysqlTable, varchar, int, text, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ITINERARY
export const itinerary = mysqlTable("itinerary", {
  id: int("id").primaryKey().autoincrement(),
  eventDate: varchar("event_date", { length: 50 }).notNull(),
  eventTime: varchar("event_time", { length: 50 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 10 }),
});

// USERS
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("ALUMNO").notNull(),
  isAdmin: int("is_admin").default(0).notNull(),
  bio: text("bio"),
});

// ARTICLES
export const articles = mysqlTable("articles", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  pubDate: varchar("pub_date", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  importance: int("importance").notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 255 }),
  isUrgent: int("is_urgent").default(0).notNull(),
});

// SOCIAL PROFILES (1:N)
export const socialProfiles = mysqlTable("social_profiles", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: varchar("platform", { length: 100 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
});

// NOTICES
export const notices = mysqlTable("notices", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  priority: varchar("priority", { length: 20 }).default("low"),
  createdAt: timestamp("created_at").defaultNow(),
});

// RELATIONS
export const usersRelations = relations(users, ({ many }) => ({
  socials: many(socialProfiles),
}));
