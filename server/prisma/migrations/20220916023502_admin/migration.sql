/*
  Warnings:

  - The primary key for the `BackstageAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[account]` on the table `BackstageAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `BackstageAdmin` DROP PRIMARY KEY,
    ADD COLUMN `name` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `BackstageAdmin_account_key` ON `BackstageAdmin`(`account`);
