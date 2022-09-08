/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserTransaction_user_id_key` ON `UserTransaction`(`user_id`);
