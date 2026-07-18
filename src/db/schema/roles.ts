import { pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const roles = pgTable("roles", {
  roleId: varchar("role_id", { length: 5 }).primaryKey(),
  roleName: varchar("role_name", { length: 50 }).notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));