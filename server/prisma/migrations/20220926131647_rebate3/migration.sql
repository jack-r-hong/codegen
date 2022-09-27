/*
  Warnings:

  - You are about to drop the column `rebate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referral_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rebate` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Referral` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `rebate` DECIMAL(4, 2) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `rebate`,
    DROP COLUMN `referral_id`;

-- CreateTable
CREATE TABLE `ReferralMap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referral_code` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_user_id_key` ON `Referral`(`user_id`);

-- AddForeignKey
ALTER TABLE `ReferralMap` ADD CONSTRAINT `ReferralMap_referral_code_fkey` FOREIGN KEY (`referral_code`) REFERENCES `Referral`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferralMap` ADD CONSTRAINT `ReferralMap_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
