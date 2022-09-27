/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `ReferralMap` DROP FOREIGN KEY `ReferralMap_referral_code_fkey`;

-- AlterTable
ALTER TABLE `ReferralMap` MODIFY `referral_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_code_key` ON `Referral`(`code`);

-- AddForeignKey
ALTER TABLE `ReferralMap` ADD CONSTRAINT `ReferralMap_referral_code_fkey` FOREIGN KEY (`referral_code`) REFERENCES `Referral`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
