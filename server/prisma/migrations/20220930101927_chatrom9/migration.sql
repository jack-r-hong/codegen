/*
  Warnings:

  - You are about to drop the `TransactionChatroomCursor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TransactionChatroomCursor` DROP FOREIGN KEY `TransactionChatroomCursor_transaction_id_fkey`;

-- DropTable
DROP TABLE `TransactionChatroomCursor`;
