ALTER TABLE `stores` MODIFY COLUMN `name` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `description` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `userId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `active` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `stripeAccountId` varchar(191);--> statement-breakpoint
ALTER TABLE `stores` ADD `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `user_id`;