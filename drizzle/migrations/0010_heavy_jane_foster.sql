ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-02T20:42:38.187Z"';--> statement-breakpoint
ALTER TABLE `itinerary` ADD `location` text;