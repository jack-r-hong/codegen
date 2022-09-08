/*
  Warnings:

  - You are about to drop the column `bank_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `ban_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_account` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_code` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_bank_id_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `bank_id`,
    ADD COLUMN `ban_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `bank_account` INTEGER NOT NULL,
    ADD COLUMN `bank_code` INTEGER NOT NULL;
