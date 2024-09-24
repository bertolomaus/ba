CREATE TABLE IF NOT EXISTS `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer,
	`title` text,
	`goal` text,
	`description` text,
	`requiredSkills` text,
	`winCondition` text,
	`whyAchieveable` text,
	`whyRelevant` text,
	`deadline` text,
	`members` text,
	`resources` text,
	`isLookingForMembers` integer,
	`isVisible` integer,
	`isDone` integer
);
--> statement-breakpoint
CREATE TABLE  IF NOT EXISTS `questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner` integer,
	`title` text,
	`description` text,
	`attemptedSolutions` text,
	`requiredSkills` text,
	`isVisible` integer,
	`isDone` integer
);
--> statement-breakpoint
CREATE TABLE  IF NOT EXISTS `skills` (
	`name` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE  IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`data` text NOT NULL
);