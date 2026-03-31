ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-03-31T19:38:20.166Z"';--> statement-breakpoint
ALTER TABLE `articles` ADD `image` text;