CREATE TABLE "patient_programs" (
	"patient_program_id" varchar(10) PRIMARY KEY NOT NULL,
	"patient_id" varchar(10) NOT NULL,
	"program_id" varchar(10) NOT NULL,
	"assigned_by" varchar(10) NOT NULL,
	"assigned_date" date,
	"start_date" date,
	"end_date" date,
	"status" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"program_id" varchar(10) PRIMARY KEY NOT NULL,
	"program_name" varchar(100) NOT NULL,
	"description" text,
	"repeat_count" integer,
	"session_per_day" integer,
	"duration_sec" integer,
	"program_type" varchar(20) NOT NULL,
	"created_by" varchar(10),
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "patient_programs" ADD CONSTRAINT "patient_programs_patient_id_patients_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_programs" ADD CONSTRAINT "patient_programs_program_id_programs_program_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("program_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_programs" ADD CONSTRAINT "patient_programs_assigned_by_occupational_therapists_ot_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."occupational_therapists"("ot_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_created_by_occupational_therapists_ot_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."occupational_therapists"("ot_id") ON DELETE no action ON UPDATE no action;