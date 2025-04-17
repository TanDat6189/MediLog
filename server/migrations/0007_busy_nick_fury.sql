ALTER TABLE "hospital" ALTER COLUMN "profile_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "visit_image" ALTER COLUMN "note_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "visit_note" ALTER COLUMN "hospital_id" SET DATA TYPE text;