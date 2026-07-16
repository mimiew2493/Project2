import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { therapySessions } from "./therapy-sessions";
import { occupationalTherapists } from "./occupational-therapist";

export const feedback = pgTable("feedback", {
  feedbackId: varchar("feedback_id", { length: 10 }).primaryKey(),

  sessionId: varchar("session_id", { length: 10 })
    .notNull()
    .references(() => therapySessions.sessionId),

  otId: varchar("ot_id", { length: 10 })
    .notNull()
    .references(() => occupationalTherapists.otId),

  rating: integer("rating"),

  feedbackText: text("feedback_text"),

  createdAt: timestamp("created_at"),
});
