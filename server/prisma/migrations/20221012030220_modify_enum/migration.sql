/*
  Warnings:

  - The values [serviceFee] on the enum `transactionSetting_key` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactionSetting` MODIFY `key` ENUM('FirstReward', 'AccumulatedReward', 'AtmHandlingFee', 'HandlingFee', 'ServiceFee') NOT NULL;
-- ADD initial  data
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (1, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (2, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (3, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (4, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (5, '0');