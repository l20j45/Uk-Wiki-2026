ALTER TABLE `itinerary` ALTER COLUMN "event_time" TO "event_time" text NOT NULL;--> statement-breakpoint
ALTER TABLE `itinerary` ADD `finished` text;--> statement-breakpoint
ALTER TABLE `notices` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-04-06T19:24:48.539Z"';