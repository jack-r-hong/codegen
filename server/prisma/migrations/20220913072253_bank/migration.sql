/*
  Warnings:

  - A unique constraint covering the columns `[user_verify_id,field]` on the table `UserVerifyResonDes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UserVerify` MODIFY `address` INTEGER NOT NULL DEFAULT 1,
    MODIFY `birthdate` INTEGER NOT NULL DEFAULT 1,
    MODIFY `certificate` INTEGER NOT NULL DEFAULT 1,
    MODIFY `country` INTEGER NOT NULL DEFAULT 1,
    MODIFY `email` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id_card_date` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id_card_photo` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id_card_posiition` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id_card_type` INTEGER NOT NULL DEFAULT 1,
    MODIFY `name` INTEGER NOT NULL DEFAULT 1,
    MODIFY `selfie` INTEGER NOT NULL DEFAULT 1,
    MODIFY `sign` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `BankAccountVerify` (
    `account` INTEGER NOT NULL,
    `code` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` INTEGER NOT NULL,
    `photo` INTEGER NOT NULL,
    `bank_id` INTEGER NOT NULL,

    UNIQUE INDEX `BankAccountVerify_bank_id_key`(`bank_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccountVerifyReson` (
    `des` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccountVerifyResonDes` (
    `field` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_account_verify_id` INTEGER NOT NULL,
    `bank_account_verify_reson_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserVerifyResonDes_user_verify_id_field_key` ON `UserVerifyResonDes`(`user_verify_id`, `field`);

-- AddForeignKey
ALTER TABLE `BankAccountVerify` ADD CONSTRAINT `BankAccountVerify_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccountVerifyResonDes` ADD CONSTRAINT `BankAccountVerifyResonDes_bank_account_verify_id_fkey` FOREIGN KEY (`bank_account_verify_id`) REFERENCES `BankAccountVerify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccountVerifyResonDes` ADD CONSTRAINT `BankAccountVerifyResonDes_bank_account_verify_reson_id_fkey` FOREIGN KEY (`bank_account_verify_reson_id`) REFERENCES `BankAccountVerifyReson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
