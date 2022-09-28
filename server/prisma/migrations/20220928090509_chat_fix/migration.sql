/*
  Warnings:

  - Added the required column `role` to the `TransactionChatroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionChatroom` ADD COLUMN `role` INTEGER NOT NULL;
