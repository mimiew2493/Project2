import { pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const occupationalTherapists = pgTable("occupational_therapists", {
  otId: varchar("ot_id", { length: 10 }).primaryKey(),

  userId: varchar("user_id", { length: 10 })
    .notNull()
    .unique()
    .references(() => users.userId),

  licenseNumber: varchar("license_number", { length: 50 }),
});
