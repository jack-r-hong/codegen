/*
  Warnings:

  - A unique constraint covering the columns `[user_id,room_id]` on the table `UserChatroomCursor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `UserChatroomCursor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `UserChatroomMessange` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserChatroomCursor` DROP FOREIGN KEY `UserChatroomCursor_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserChatroomMessange` DROP FOREIGN KEY `UserChatroomMessange_user_id_fkey`;

-- DropIndex
DROP INDEX `UserChatroomCursor_user_id_name_key` ON `UserChatroomCursor`;

-- AlterTable
ALTER TABLE `UserChatroomCursor` ADD COLUMN `room_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserChatroomMessange` ADD COLUMN `room_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserChatroomCursor_user_id_room_id_key` ON `UserChatroomCursor`(`user_id`, `room_id`);

-- AddForeignKey
ALTER TABLE `UserChatroomMessange` ADD CONSTRAINT `UserChatroomMessange_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChatroomCursor` ADD CONSTRAINT `UserChatroomCursor_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
