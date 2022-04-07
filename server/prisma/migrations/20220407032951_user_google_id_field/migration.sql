/*
  Warnings:

  - Added the required column `google_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `google_id` INTEGER NOT NULL;
