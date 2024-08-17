CREATE TABLE `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);