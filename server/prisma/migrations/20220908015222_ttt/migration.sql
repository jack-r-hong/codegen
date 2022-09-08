/*
  Warnings:

  - You are about to drop the column `phone` on the `UserVerify` table. All the data in the column will be lost.
  - You are about to drop the column `phone_prefix` on the `UserVerify` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bank_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bank_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `bank_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserVerify` DROP COLUMN `phone`,
    DROP COLUMN `phone_prefix`;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_bank_id_key` ON `Transaction`(`bank_id`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
