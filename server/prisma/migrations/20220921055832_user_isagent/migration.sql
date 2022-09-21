/*
  Warnings:

  - Added the required column `is_agent` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `is_agent` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `ServiceChatroom` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `data` BLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
