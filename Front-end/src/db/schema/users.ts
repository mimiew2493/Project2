import { pgTable, varchar, timestamp, date } from "drizzle-orm/pg-core";
import { roles } from "./roles";

export const users = pgTable("users", {
  userId: varchar("user_id", { length: 10 }).primaryKey(),

  roleId: varchar("role_id", { length: 5 })
    .notNull()
    .references(() => roles.roleId),

  username: varchar("username", { length: 50 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  firstName: varchar("first_name", { length: 50 }).notNull(),

  lastName: varchar("last_name", { length: 50 }).notNull(),

  phone: varchar("phone", { length: 15 }),

  email: varchar("email", { length: 100 }).unique(),

  profileImage: varchar("profile_image", { length: 255 }),

  gender: varchar("gender", { length: 10 }),

  birthDate: date("birth_date"),

  status: varchar("status", { length: 20 }),

  createdAt: timestamp("created_at"),

  updatedAt: timestamp("updated_at"),
});

