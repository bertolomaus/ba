CREATE TABLE `questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer,
	`title` text,
	`description` text,
	`attemptedSolutions` text,
	`requiredSkills` text,
	`isVisible` integer,
	`isDone` integer
);