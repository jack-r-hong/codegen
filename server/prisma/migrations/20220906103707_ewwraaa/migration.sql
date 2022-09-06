/*
  Warnings:

  - A unique constraint covering the columns `[user_id,order]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BankAccount_user_id_order_key` ON `BankAccount`(`user_id`, `order`);
