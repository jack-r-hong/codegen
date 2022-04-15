/*
  Warnings:

  - Added the required column `owner_id` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `owner_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
