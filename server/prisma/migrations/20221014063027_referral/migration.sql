-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `referral_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_referral_id_fkey` FOREIGN KEY (`referral_id`) REFERENCES `Referral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
