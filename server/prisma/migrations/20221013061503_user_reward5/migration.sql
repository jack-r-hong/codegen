/*
  Warnings:

  - Added the required column `amount` to the `user_accumulated_reward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_accumulated_reward` ADD COLUMN `amount` INTEGER NOT NULL;
