CREATE TYPE "public"."bloodType" AS ENUM('A', 'B', 'AB0', 'O');--> statement-breakpoint
CREATE TABLE "hospitals" (
	"id" uuid PRIMARY KEY NOT NULL,
	"profile_id" uuid NOT NULL,
	"name" varchar(255),
	"address" text,
	"hotline" varchar(50),
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" varchar(255),
	"birth_year" integer,
	"hometown" varchar(255),
	"height" real,
	"weight" real,
	"bloodType" "bloodType",
	"medical_history" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"password" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "visit_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"note_id" uuid NOT NULL,
	"image_url" text,
	"uploaded_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "visit_notes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"hospital_id" uuid NOT NULL,
	"visit_date" date,
	"notes" text,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_images" ADD CONSTRAINT "visit_images_note_id_visit_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."visit_notes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_notes" ADD CONSTRAINT "visit_notes_hospital_id_hospitals_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("id") ON DELETE cascade ON UPDATE no action;