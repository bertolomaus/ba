ALTER TABLE `questions` RENAME COLUMN `data` TO `title`;--> statement-breakpoint
ALTER TABLE `questions` ADD `requiredSkills` text NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `attemptedSolutions` text NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `isVisible` integer;--> statement-breakpoint
ALTER TABLE `questions` ADD `isSolved` integer;