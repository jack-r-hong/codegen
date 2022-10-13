/*
  Warnings:

  - You are about to drop the column `accumulate_taken` on the `User` table. All the data in the column will be lost.
  - The values [AccumulatedReward,AccumulatedRewardLevel] on the enum `transactionSetting_key` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `val` on the `transactionSetting` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable

DELETE from `transactionSetting`;

ALTER TABLE `User` DROP COLUMN `accumulate_taken`,
    ADD COLUMN `first_bonus_temp` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `transactionSetting` MODIFY `key` ENUM('FirstReward', 'AtmHandlingFee', 'BarCodeHandlingFee', 'ServiceFee') NOT NULL,
    MODIFY `val` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `accumulated_reward` (
    `reward` INTEGER NOT NULL DEFAULT 0,
    `amount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `accumulated_reward_amount_key`(`amount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO `transactionSetting` (`key`, `val`)VALUES (1, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (2, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (3, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (4, '0');