/*
  Warnings:

  - You are about to drop the column `referral_code` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `referral_code`,
    ADD COLUMN `referral_id` VARCHAR(191) NULL;
