ALTER TABLE `projects` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `requiredSkills` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `members` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `resources` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `isLookingForMembers` integer;--> statement-breakpoint
ALTER TABLE `projects` ADD `isVisible` integer;--> statement-breakpoint
ALTER TABLE `projects` ADD `isSolved` integer;--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `data`;