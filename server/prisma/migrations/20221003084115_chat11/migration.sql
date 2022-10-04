/*
  Warnings:

  - You are about to drop the `TransactionChatroomCursor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionChatroomMessange` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TransactionChatroomCursor` DROP FOREIGN KEY `TransactionChatroomCursor_transaction_id_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionChatroomMessange` DROP FOREIGN KEY `TransactionChatroomMessange_transaction_id_fkey`;

-- DropTable
DROP TABLE `TransactionChatroomCursor`;

-- DropTable
DROP TABLE `TransactionChatroomMessange`;
