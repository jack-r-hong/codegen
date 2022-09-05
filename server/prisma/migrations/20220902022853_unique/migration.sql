/*
  Warnings:

  - A unique constraint covering the columns `[phone,phone_prefix]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_phone_phone_prefix_key` ON `User`(`phone`, `phone_prefix`);
