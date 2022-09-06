/*
  Warnings:

  - A unique constraint covering the columns `[user_id,type]` on the table `UserVerifyPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserVerifyPhoto_user_id_type_key` ON `UserVerifyPhoto`(`user_id`, `type`);
