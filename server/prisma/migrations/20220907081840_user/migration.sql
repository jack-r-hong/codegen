-- CreateTable
CREATE TABLE `BankAccount` (
    `account` INTEGER NOT NULL,
    `code` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `account` VARCHAR(191) NOT NULL,
    `bonus_point` INTEGER NOT NULL,
    `bos` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,
    `twd` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionRecive` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` VARCHAR(191) NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `address` VARCHAR(191) NULL,
    `area` VARCHAR(191) NULL,
    `birthdate` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NULL,
    `id` VARCHAR(191) NOT NULL,
    `id_card` VARCHAR(191) NULL,
    `id_card_date` VARCHAR(191) NULL,
    `id_card_posiition` VARCHAR(191) NULL,
    `id_card_type` INTEGER NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `phone_prefix` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_status` INTEGER NOT NULL DEFAULT 2,
    `level` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserLevel_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTransaction` (
    `atcbw` INTEGER NOT NULL,
    `cnot` INTEGER NOT NULL,
    `cta` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `limit` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVerify` (
    `address` INTEGER NOT NULL,
    `birthdate` INTEGER NOT NULL,
    `certificate` INTEGER NOT NULL,
    `country` INTEGER NOT NULL,
    `email` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_card_date` INTEGER NOT NULL,
    `id_card_photo` INTEGER NOT NULL,
    `id_card_posiition` INTEGER NOT NULL,
    `id_card_type` INTEGER NOT NULL,
    `name` INTEGER NOT NULL,
    `phone` INTEGER NOT NULL,
    `phone_prefix` INTEGER NOT NULL,
    `selfie` INTEGER NOT NULL,
    `sign` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVerifyPhoto` (
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVerifyReson` (
    `des` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVerifyResonDes` (
    `field` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_verify_reson_id` INTEGER NOT NULL,
    `user_verify_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionRecive` ADD CONSTRAINT `TransactionRecive_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionRecive` ADD CONSTRAINT `TransactionRecive_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_level_fkey` FOREIGN KEY (`level`) REFERENCES `UserLevel`(`level`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVerify` ADD CONSTRAINT `UserVerify_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVerifyPhoto` ADD CONSTRAINT `UserVerifyPhoto_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVerifyResonDes` ADD CONSTRAINT `UserVerifyResonDes_user_verify_reson_id_fkey` FOREIGN KEY (`user_verify_reson_id`) REFERENCES `UserVerifyReson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVerifyResonDes` ADD CONSTRAINT `UserVerifyResonDes_user_verify_id_fkey` FOREIGN KEY (`user_verify_id`) REFERENCES `UserVerify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
