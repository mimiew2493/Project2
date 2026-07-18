import { pgTable, varchar, date, decimal } from "drizzle-orm/pg-core";
import { users } from "./users";

export const patients = pgTable("patients", {
  patientId: varchar("patient_id", { length: 10 }).primaryKey(),

  userId: varchar("user_id", { length: 10 })
    .notNull()
    .unique()
    .references(() => users.userId),

  hospitalNumber: varchar("hospital_number", { length: 20 }).notNull().unique(),

  weight: decimal("weight", {
    precision: 5,
    scale: 2,
  }),

  height: decimal("height", {
    precision: 5,
    scale: 2,
  }),

  medicalCondition: varchar("medical_condition", {
    length: 255,
  }),

  emergencyContactName: varchar("emergency_contact_name", {
    length: 100,
  }),

  emergencyContactPhone: varchar("emergency_contact_phone", {
    length: 20,
  }),

  registerDate: date("register_date"),

  address: varchar("address", {
    length: 255,
  }),
  
});
