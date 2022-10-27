/*
  Warnings:

  - You are about to drop the `ServiceChatroom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ServiceChatroom`;

-- CreateTable
CREATE TABLE `UserChatroomMessange` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `data` MEDIUMBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserChatroomCursor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cursor` INTEGER NOT NULL,

    UNIQUE INDEX `UserChatroomCursor_user_id_name_key`(`user_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserChatroomMessange` ADD CONSTRAINT `UserChatroomMessange_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChatroomCursor` ADD CONSTRAINT `UserChatroomCursor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
