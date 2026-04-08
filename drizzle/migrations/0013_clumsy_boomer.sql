ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-08T01:32:01.110Z"';--> statement-breakpoint
ALTER TABLE `users` ADD `extra_info` text;