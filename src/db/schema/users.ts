import { pgTable, varchar, timestamp, date } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { patients } from "./patients";
import { occupationalTherapists } from "./occupational-therapist";
import { medicalRecordsStaff } from "./medical-records-staff";
import { relations } from "drizzle-orm";

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

  status: varchar("status", { length: 20 }).default("active").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.roleId],
  }),
  patient: one(patients, {
    fields: [users.userId],
    references: [patients.userId],
  }),
  occupationalTherapist: one(occupationalTherapists, {
    fields: [users.userId],
    references: [occupationalTherapists.userId],
  }),
  medicalRecordsStaff: one(medicalRecordsStaff, {
    fields: [users.userId],
    references: [medicalRecordsStaff.userId],
  }),
}));