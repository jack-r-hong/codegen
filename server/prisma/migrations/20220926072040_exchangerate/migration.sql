/*
  Warnings:

  - You are about to drop the column `bos` on the `ExchangeRateBuy` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ExchangeRateBuy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ExchangeRateBuy` DROP COLUMN `bos`,
    DROP COLUMN `created_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
