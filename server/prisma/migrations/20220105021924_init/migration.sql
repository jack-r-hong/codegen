-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `auth_level` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updated_at` DATETIME(3) NOT NULL,
    `role` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,

    UNIQUE INDEX `Auth_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_auth_level_fkey` FOREIGN KEY (`auth_level`) REFERENCES `Auth`(`level`) ON DELETE RESTRICT ON UPDATE CASCADE;
