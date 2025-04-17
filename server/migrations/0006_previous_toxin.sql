ALTER TABLE "hospitals" RENAME TO "hospital";--> statement-breakpoint
ALTER TABLE "profiles" RENAME TO "profile";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "visit_images" RENAME TO "visit_image";--> statement-breakpoint
ALTER TABLE "visit_notes" RENAME TO "visit_note";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "hospital" DROP CONSTRAINT "hospitals_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "visit_image" DROP CONSTRAINT "visit_images_note_id_visit_notes_id_fk";
--> statement-breakpoint
ALTER TABLE "visit_note" DROP CONSTRAINT "visit_notes_hospital_id_hospitals_id_fk";
--> statement-breakpoint
ALTER TABLE "hospital" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "hospital" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "visit_image" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "visit_image" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "visit_note" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "visit_note" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "hospital" ADD CONSTRAINT "hospital_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_image" ADD CONSTRAINT "visit_image_note_id_visit_note_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."visit_note"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_note" ADD CONSTRAINT "visit_note_hospital_id_hospital_id_fk" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hospital" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "visit_image" DROP COLUMN "uploaded_at";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");