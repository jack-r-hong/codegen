/*
  Warnings:

  - You are about to drop the column `process` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `process`,
    ADD COLUMN `appeal` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `timeout` BOOLEAN NOT NULL DEFAULT false;
