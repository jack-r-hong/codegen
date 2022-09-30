/*
  Warnings:

  - You are about to drop the column `read` on the `TransactionChatroom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TransactionChatroom` DROP COLUMN `read`;

-- CreateTable
CREATE TABLE `TransactionChatroomRead` (
    `id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionChatroomRead` ADD CONSTRAINT `TransactionChatroomRead_id_fkey` FOREIGN KEY (`id`) REFERENCES `TransactionChatroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
