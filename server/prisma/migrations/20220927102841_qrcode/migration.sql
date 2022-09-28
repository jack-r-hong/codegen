-- AlterTable
ALTER TABLE `TransactionChatroom` MODIFY `data` MEDIUMBLOB NULL;

-- CreateTable
CREATE TABLE `transactionQrcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `data` MEDIUMBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
