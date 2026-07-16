CREATE TABLE "devices" (
	"device_id" varchar(10) PRIMARY KEY NOT NULL,
	"device_name" varchar(100) NOT NULL,
	"device_type" varchar(50),
	"serial_number" varchar(50),
	"device_status" varchar(20),
	"created_at" timestamp,
	CONSTRAINT "devices_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"feedback_id" varchar(10) PRIMARY KEY NOT NULL,
	"session_id" varchar(10) NOT NULL,
	"ot_id" varchar(10) NOT NULL,
	"rating" integer,
	"feedback_text" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "therapy_sessions" (
	"session_id" varchar(10) PRIMARY KEY NOT NULL,
	"patient_program_id" varchar(10) NOT NULL,
	"session_date" timestamp,
	"total_reps" integer,
	"avg_speed" numeric(5, 2),
	"duration_sec" integer,
	"status" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "movement_data" (
	"movement_id" varchar(10) PRIMARY KEY NOT NULL,
	"session_id" varchar(10) NOT NULL,
	"device_id" varchar(10) NOT NULL,
	"rep_no" integer,
	"speed" numeric(5, 2),
	"recorded_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_session_id_therapy_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."therapy_sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_ot_id_occupational_therapists_ot_id_fk" FOREIGN KEY ("ot_id") REFERENCES "public"."occupational_therapists"("ot_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "therapy_sessions" ADD CONSTRAINT "therapy_sessions_patient_program_id_patient_programs_patient_program_id_fk" FOREIGN KEY ("patient_program_id") REFERENCES "public"."patient_programs"("patient_program_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movement_data" ADD CONSTRAINT "movement_data_session_id_therapy_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."therapy_sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movement_data" ADD CONSTRAINT "movement_data_device_id_devices_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("device_id") ON DELETE no action ON UPDATE no action;