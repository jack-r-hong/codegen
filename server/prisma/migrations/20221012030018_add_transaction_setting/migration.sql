-- CreateTable
CREATE TABLE `transactionSetting` (
    `key` ENUM('FirstReward', 'AccumulatedReward', 'AtmHandlingFee', 'HandlingFee', 'serviceFee') NOT NULL,
    `val` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transactionSetting_key_key`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
