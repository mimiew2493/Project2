import {
  pgTable,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const devices = pgTable("devices", {
  deviceId: varchar("device_id", { length: 10 }).primaryKey(),

  deviceName: varchar("device_name", { length: 100 }).notNull(),

  deviceType: varchar("device_type", { length: 50 }),

  serialNumber: varchar("serial_number", { length: 50 }).unique(),

  deviceStatus: varchar("device_status", { length: 20 }),

  createdAt: timestamp("created_at"),
});