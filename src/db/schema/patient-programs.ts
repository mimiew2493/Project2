import { pgTable, varchar, date } from "drizzle-orm/pg-core";
import { patients } from "./patients";
import { programs } from "./programs";
import { occupationalTherapists } from "./occupational-therapist";

export const patientPrograms = pgTable("patient_programs", {
  patientProgramId: varchar("patient_program_id", { length: 10 }).primaryKey(),

  patientId: varchar("patient_id", { length: 10 })
    .notNull()
    .references(() => patients.patientId),

  programId: varchar("program_id", { length: 10 })
    .notNull()
    .references(() => programs.programId),

  assignedBy: varchar("assigned_by", { length: 10 })
    .notNull()
    .references(() => occupationalTherapists.otId),

  assignedDate: date("assigned_date"),

  startDate: date("start_date"),

  endDate: date("end_date"),

  status: varchar("status", { length: 20 }),
});
