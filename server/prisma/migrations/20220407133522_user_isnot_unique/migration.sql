-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Photo` MODIFY `process` INTEGER NOT NULL DEFAULT 1;
