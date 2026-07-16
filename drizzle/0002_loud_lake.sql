CREATE TABLE "patients" (
	"patient_id" varchar(10) PRIMARY KEY NOT NULL,
	"user_id" varchar(10) NOT NULL,
	"hospital_number" varchar(20) NOT NULL,
	"weight" numeric(5, 2),
	"height" numeric(5, 2),
	"medical_condition" varchar(255),
	"emergency_contact_name" varchar(100),
	"emergency_contact_phone" varchar(20),
	"register_date" date,
	"address" varchar(255),
	CONSTRAINT "patients_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "patients_hospital_number_unique" UNIQUE("hospital_number")
);
--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;