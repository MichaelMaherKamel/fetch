CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`category` enum('Women','Men','Kids') NOT NULL,
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0.00',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`storeId` int NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
