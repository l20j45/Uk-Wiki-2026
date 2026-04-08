CREATE TABLE `emergency_contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`number` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-08T01:42:15.782Z"';--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `emergency_contact`;