import {
  pgTable,
  varchar,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { patientPrograms } from "./patient-programs";

export const therapySessions = pgTable("therapy_sessions", {
  sessionId: varchar("session_id", { length: 10 }).primaryKey(),

  patientProgramId: varchar("patient_program_id", { length: 10 })
    .notNull()
    .references(() => patientPrograms.patientProgramId),

  sessionDate: timestamp("session_date"),

  totalReps: integer("total_reps"),

  avgSpeed: numeric("avg_speed", {
    precision: 5,
    scale: 2,
  }),

  durationSec: integer("duration_sec"),

  status: varchar("status", { length: 20 }),
});