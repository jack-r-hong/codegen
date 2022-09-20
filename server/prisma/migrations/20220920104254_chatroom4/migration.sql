/*
  Warnings:

  - You are about to drop the column `transcation_id` on the `TransactionChatroom` table. All the data in the column will be lost.
  - Added the required column `transaction_id` to the `TransactionChatroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionChatroom` DROP COLUMN `transcation_id`,
    ADD COLUMN `transaction_id` VARCHAR(191) NOT NULL,
    MODIFY `data` BLOB NOT NULL;
