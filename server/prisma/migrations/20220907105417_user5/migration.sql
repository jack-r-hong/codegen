/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserVerify` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserVerify_user_id_key` ON `UserVerify`(`user_id`);
