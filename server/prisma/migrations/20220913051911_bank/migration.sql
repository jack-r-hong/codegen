/*
  Warnings:

  - You are about to alter the column `name` on the `BankAccountVerify` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[bank_id]` on the table `BankAccountVerify` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `BankAccountVerify` MODIFY `name` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BankAccountVerify_bank_id_key` ON `BankAccountVerify`(`bank_id`);
