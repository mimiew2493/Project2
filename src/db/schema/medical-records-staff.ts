import { pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const medicalRecordsStaff = pgTable("medical_records_staff", {
  medicalRecordsStaffId: varchar("medical_records_staff_id", {
    length: 10,
  }).primaryKey(),

  userId: varchar("user_id", { length: 10 })
    .notNull()
    .unique()
    .references(() => users.userId),
});
