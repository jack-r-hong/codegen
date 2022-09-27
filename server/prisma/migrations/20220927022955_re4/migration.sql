/*
  Warnings:

  - You are about to drop the column `code` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referral_code` on the `ReferralMap` table. All the data in the column will be lost.
  - Added the required column `referral_id` to the `ReferralMap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ReferralMap` DROP FOREIGN KEY `ReferralMap_referral_code_fkey`;

-- DropIndex
DROP INDEX `Referral_code_key` ON `Referral`;

-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `code`;

-- AlterTable
ALTER TABLE `ReferralMap` DROP COLUMN `referral_code`,
    ADD COLUMN `referral_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ReferralMap` ADD CONSTRAINT `ReferralMap_referral_id_fkey` FOREIGN KEY (`referral_id`) REFERENCES `Referral`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
