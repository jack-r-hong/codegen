-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `completed_at` DATETIME(3) NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    ADD COLUMN `pair_at` DATETIME(3) NULL,
    ADD COLUMN `process` INTEGER NOT NULL DEFAULT 1;
