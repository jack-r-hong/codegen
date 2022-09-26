/*
  Warnings:

  - You are about to drop the `ExchangeRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ExchangeRate`;

-- CreateTable
CREATE TABLE `ExchangeRateBuy` (
    `bos` INTEGER NOT NULL,
    `bouns` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `des` VARCHAR(191) NOT NULL,
    `dollars` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `point` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeRateSell` (
    `des` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `range_lower` INTEGER NOT NULL,
    `range_upper` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
