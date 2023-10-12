CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` text,
	`subcategory` varchar(256) NOT NULL,
	`price` real NOT NULL,
	`store_id` int NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
