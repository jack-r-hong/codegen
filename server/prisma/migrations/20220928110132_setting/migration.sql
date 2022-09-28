-- CreateTable
CREATE TABLE `transactionSetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_bonus_point` INTEGER NOT NULL,
    `handling_fee` INTEGER NOT NULL,
    `service_fee` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
