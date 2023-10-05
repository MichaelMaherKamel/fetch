ALTER TABLE `stores` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `stores` ADD `active` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD `stripeAccountId` varchar(191);--> statement-breakpoint
ALTER TABLE `stores` ADD `createdAt` timestamp DEFAULT (now());