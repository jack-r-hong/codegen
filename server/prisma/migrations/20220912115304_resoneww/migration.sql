-- CreateTable
CREATE TABLE `BankAccountVerify` (
    `account` INTEGER NOT NULL,
    `code` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `bank_id` INTEGER NOT NULL,

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

    UNIQUE INDEX `BankAccountVerifyResonDes_bank_account_verify_reson_id_field_key`(`bank_account_verify_reson_id`, `field`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BankAccountVerify` ADD CONSTRAINT `BankAccountVerify_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccountVerifyResonDes` ADD CONSTRAINT `BankAccountVerifyResonDes_bank_account_verify_id_fkey` FOREIGN KEY (`bank_account_verify_id`) REFERENCES `BankAccountVerify`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccountVerifyResonDes` ADD CONSTRAINT `BankAccountVerifyResonDes_bank_account_verify_reson_id_fkey` FOREIGN KEY (`bank_account_verify_reson_id`) REFERENCES `BankAccountVerifyReson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
