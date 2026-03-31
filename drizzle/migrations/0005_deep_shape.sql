ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-03-31T21:51:07.464Z"';--> statement-breakpoint
ALTER TABLE `articles` ADD `slug` text NOT NULL;