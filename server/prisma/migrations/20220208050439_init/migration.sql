-- CreateTable
CREATE TABLE `Auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `updated_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Auth_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `created_at` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `user_status` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `auth_level` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_auth_level_fkey` FOREIGN KEY (`auth_level`) REFERENCES `Auth`(`level`) ON DELETE RESTRICT ON UPDATE CASCADE;
