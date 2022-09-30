/*
  Warnings:

  - Added the required column `chatroom_id` to the `TransactionChatroomRead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TransactionChatroomRead` DROP FOREIGN KEY `TransactionChatroomRead_id_fkey`;

-- AlterTable
ALTER TABLE `TransactionChatroomRead` ADD COLUMN `chatroom_id` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AddForeignKey
ALTER TABLE `TransactionChatroomRead` ADD CONSTRAINT `TransactionChatroomRead_chatroom_id_fkey` FOREIGN KEY (`chatroom_id`) REFERENCES `TransactionChatroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
