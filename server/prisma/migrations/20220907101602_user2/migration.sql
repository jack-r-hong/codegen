/*
  Warnings:

  - A unique constraint covering the columns `[user_id,order]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone,phone_prefix]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,type]` on the table `UserVerifyPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BankAccount_user_id_order_key` ON `BankAccount`(`user_id`, `order`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_phone_prefix_key` ON `User`(`phone`, `phone_prefix`);

-- CreateIndex
CREATE UNIQUE INDEX `UserVerifyPhoto_user_id_type_key` ON `UserVerifyPhoto`(`user_id`, `type`);
