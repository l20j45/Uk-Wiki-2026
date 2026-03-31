CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`pub_date` text NOT NULL,
	`category` text NOT NULL,
	`importance` integer NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `itinerary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_date` text NOT NULL,
	`event_time` text,
	`title` text NOT NULL,
	`description` text,
	`icon` text DEFAULT '📍'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL,
	`lastName` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL
);
