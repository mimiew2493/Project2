CREATE TABLE "occupational_therapists" (
	"ot_id" varchar(10) PRIMARY KEY NOT NULL,
	"user_id" varchar(10) NOT NULL,
	"license_number" varchar(50),
	CONSTRAINT "occupational_therapists_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "occupational_therapists" ADD CONSTRAINT "occupational_therapists_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;