ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-01T19:10:26.698Z"';--> statement-breakpoint
ALTER TABLE `users` ADD `blood_type` text;--> statement-breakpoint
ALTER TABLE `users` ADD `allergies` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emergency_contact` text;