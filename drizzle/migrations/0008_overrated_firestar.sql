ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-01T20:26:15.926Z"';--> statement-breakpoint
ALTER TABLE `users` ADD `qr_url` text;