/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Auth` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Auth` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
