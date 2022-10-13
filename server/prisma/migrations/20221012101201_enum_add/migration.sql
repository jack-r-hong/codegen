DELETE from `transactionSetting`;

-- AlterTable
ALTER TABLE `transactionSetting` MODIFY `key` ENUM('FirstReward', 'AccumulatedReward', 'AccumulatedRewardLevel', 'AtmHandlingFee', 'BarCodeHandlingFee', 'ServiceFee') NOT NULL;

INSERT INTO `transactionSetting` (`key`, `val`)VALUES (1, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (2, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (3, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (4, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (5, '0');
INSERT INTO `transactionSetting` (`key`, `val`)VALUES (6, '0');