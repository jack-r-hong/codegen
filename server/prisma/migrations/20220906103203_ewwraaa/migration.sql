/*
  Warnings:

  - Added the required column `order` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BankAccount` ADD COLUMN `order` INTEGER NOT NULL;
