/*
  Warnings:

  - You are about to drop the column `name` on the `UserChatroomCursor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `UserChatroomMessange_user_id_fkey` ON `UserChatroomMessange`;

-- AlterTable
ALTER TABLE `UserChatroomCursor` DROP COLUMN `name`;
