/*
  Warnings:

  - You are about to drop the `userr_accumulated_reward` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userr_accumulated_reward` DROP FOREIGN KEY `userr_accumulated_reward_user_id_fkey`;

-- DropTable
DROP TABLE `userr_accumulated_reward`;

-- CreateTable
CREATE TABLE `user_accumulated_reward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_accumulated_reward` ADD CONSTRAINT `user_accumulated_reward_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
