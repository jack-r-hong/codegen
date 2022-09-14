-- CreateTable
CREATE TABLE `ExchangeRate` (
    `bos` INTEGER NOT NULL,
    `bouns` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `des` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `range_lower` INTEGER NOT NULL,
    `range_upper` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
