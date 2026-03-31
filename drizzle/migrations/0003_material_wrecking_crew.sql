ALTER TABLE `articles` RENAME COLUMN "is_admin" TO "is_urgent";--> statement-breakpoint
ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-03-31T19:37:12.648Z"';