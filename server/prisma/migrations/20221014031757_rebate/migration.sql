-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `rebate` INTEGER NULL,
    ADD COLUMN `rebate_rate` DECIMAL(4, 2) NULL;
