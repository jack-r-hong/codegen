/*
  Warnings:

  - You are about to drop the column `certificate` on the `UserVerify` table. All the data in the column will be lost.
  - You are about to drop the column `sign` on the `UserVerify` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserVerify` DROP COLUMN `certificate`,
    DROP COLUMN `sign`;
