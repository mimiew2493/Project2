import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { occupationalTherapists } from "./occupational-therapist";

export const programs = pgTable("programs", {
  programId: varchar("program_id", { length: 10 }).primaryKey(),

  programName: varchar("program_name", { length: 100 })
    .notNull(),

  description: text("description"),

  repeatCount: integer("repeat_count"),

  sessionPerDay: integer("session_per_day"),

  durationSec: integer("duration_sec"),

  programType: varchar("program_type", { length: 20 })
    .notNull(),

  createdBy: varchar("created_by", { length: 10 })
    .references(() => occupationalTherapists.otId),

  createdAt: timestamp("created_at"),
});