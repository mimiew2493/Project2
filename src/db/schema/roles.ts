import { pgTable, varchar } from "drizzle-orm/pg-core";
export const roles = pgTable("roles", {
  roleId: varchar("role_id", { length: 5 }).primaryKey(),
  roleName: varchar("role_name", { length: 50 }).notNull(),
});
