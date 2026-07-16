import {
  pgTable,
  varchar,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { therapySessions } from "./therapy-sessions";
import { devices } from "./devices";

export const movementData = pgTable("movement_data", {
  movementId: varchar("movement_id", { length: 10 }).primaryKey(),

  sessionId: varchar("session_id", { length: 10 })
    .notNull()
    .references(() => therapySessions.sessionId),

  deviceId: varchar("device_id", { length: 10 })
    .notNull()
    .references(() => devices.deviceId),

  repNo: integer("rep_no"),

  speed: numeric("speed", {
    precision: 5,
    scale: 2,
  }),

  recordedAt: timestamp("recorded_at"),
});