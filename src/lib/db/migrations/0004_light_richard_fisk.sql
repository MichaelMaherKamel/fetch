ALTER TABLE `stores` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `user_id` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `slug`;--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `active`;--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `stripeAccountId`;--> statement-breakpoint
ALTER TABLE `stores` DROP COLUMN `createdAt`;