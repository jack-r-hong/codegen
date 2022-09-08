/*
  Warnings:

  - You are about to drop the column `ban_name` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `bank_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `ban_name`,
    ADD COLUMN `bank_name` VARCHAR(191) NOT NULL;
