/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `TransactionRecive` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `TransactionRecive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TransactionRecive_transaction_id_key` ON `TransactionRecive`(`transaction_id`);

-- CreateIndex
CREATE UNIQUE INDEX `TransactionRecive_user_id_key` ON `TransactionRecive`(`user_id`);
