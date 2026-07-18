CREATE TABLE "users" (
	"user_id" varchar(10) PRIMARY KEY NOT NULL,
	"role_id" varchar(5) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"phone" varchar(15),
	"email" varchar(100),
	"profile_image" varchar(255),
	"gender" varchar(10),
	"birth_date" date,
	"status" varchar(20),
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE no action ON UPDATE no action;