ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-01T21:37:00.437Z"';--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "phone" TO "phone" text;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "email" TO "email" text;