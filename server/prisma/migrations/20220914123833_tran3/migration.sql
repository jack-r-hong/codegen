/*
  Warnings:

  - Added the required column `pay_method` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `pay_method` INTEGER NOT NULL;
