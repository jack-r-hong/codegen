/*
  Warnings:

  - You are about to drop the column `email` on the `UserVerify` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserVerify` DROP COLUMN `email`,
    ADD COLUMN `game_uid` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `line_id` INTEGER NOT NULL DEFAULT 1;
