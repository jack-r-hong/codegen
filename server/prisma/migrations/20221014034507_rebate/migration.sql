/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `ReferralMap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ReferralMap_user_id_key` ON `ReferralMap`(`user_id`);
