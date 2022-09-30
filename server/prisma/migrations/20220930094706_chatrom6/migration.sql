/*
  Warnings:

  - You are about to drop the `TransactionChatroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionChatroomRead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TransactionChatroomRead` DROP FOREIGN KEY `TransactionChatroomRead_chatroom_id_fkey`;

-- DropTable
DROP TABLE `TransactionChatroom`;

-- DropTable
DROP TABLE `TransactionChatroomRead`;

-- CreateTable
CREATE TABLE `TransactionChatroomMessange` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `data` MEDIUMBLOB NULL,
    `transaction_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TransactionChatroomMessange_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionChatroomCursor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `service_id` INTEGER NULL,
    `cursor` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionChatroomMessange` ADD CONSTRAINT `TransactionChatroomMessange_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionChatroomCursor` ADD CONSTRAINT `TransactionChatroomCursor_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
