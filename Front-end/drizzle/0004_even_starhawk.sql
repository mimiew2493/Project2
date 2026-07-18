CREATE TABLE "medical_records_staff" (
	"medical_records_staff_id" varchar(10) PRIMARY KEY NOT NULL,
	"user_id" varchar(10) NOT NULL,
	CONSTRAINT "medical_records_staff_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "medical_records_staff" ADD CONSTRAINT "medical_records_staff_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;