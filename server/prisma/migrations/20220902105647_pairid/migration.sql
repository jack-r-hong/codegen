/*
  Warnings:

  - A unique constraint covering the columns `[user_id,transaction_id]` on the table `TransactionRecive` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Transaction` ALTER COLUMN `bonus_point` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `TransactionRecive_user_id_transaction_id_key` ON `TransactionRecive`(`user_id`, `transaction_id`);
