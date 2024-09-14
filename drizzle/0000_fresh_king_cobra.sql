CREATE TABLE `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer NOT NULL,
	`title` text NOT NULL,
	`requiredSkills` text NOT NULL,
	`description` text NOT NULL,
	`attemptedSolutions` text NOT NULL,
	`isVisible` integer,
	`isSolved` integer
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`name` integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);