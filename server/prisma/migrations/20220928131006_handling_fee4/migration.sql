/*
  Warnings:

  - Added the required column `total_dollars` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_points` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `total_dollars` INTEGER NOT NULL,
    ADD COLUMN `total_points` INTEGER NOT NULL;
