-- AlterTable
ALTER TABLE `User` ADD COLUMN `rebate` DECIMAL(4, 2) NULL,
    ADD COLUMN `referral_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserTransaction` ADD COLUMN `rebate` INTEGER NULL;

-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
