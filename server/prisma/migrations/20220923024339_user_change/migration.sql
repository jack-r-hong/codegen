/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `game_uid` VARCHAR(191) NULL,
    ADD COLUMN `line_id` VARCHAR(191) NULL;
