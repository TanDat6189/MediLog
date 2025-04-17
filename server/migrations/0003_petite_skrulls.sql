ALTER TABLE "public"."profiles" ALTER COLUMN "bloodType" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."bloodType";--> statement-breakpoint
CREATE TYPE "public"."bloodType" AS ENUM('A', 'B', 'AB', 'O');--> statement-breakpoint
ALTER TABLE "public"."profiles" ALTER COLUMN "bloodType" SET DATA TYPE "public"."bloodType" USING "bloodType"::"public"."bloodType";