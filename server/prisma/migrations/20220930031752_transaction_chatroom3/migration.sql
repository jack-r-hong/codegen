/*
  Warnings:

  - Added the required column `service_id` to the `TransactionChatroomRead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionChatroomRead` ADD COLUMN `service_id` INTEGER NOT NULL,
    MODIFY `user_id` VARCHAR(191) NULL;
