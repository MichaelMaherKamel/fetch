CREATE TABLE `stores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`slug` text,
	`active` boolean NOT NULL DEFAULT true,
	`stripeAccountId` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `stores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `computers`;