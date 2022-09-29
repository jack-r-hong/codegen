/*
  Warnings:

  - Added the required column `handling_fee` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_fee` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `handling_fee` INTEGER NOT NULL,
    ADD COLUMN `service_fee` INTEGER NOT NULL;
