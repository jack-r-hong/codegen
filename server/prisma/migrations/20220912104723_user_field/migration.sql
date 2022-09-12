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

-- CreateIndex
CREATE UNIQUE INDEX `UserVerifyResonDes_user_verify_id_field_key` ON `UserVerifyResonDes`(`user_verify_id`, `field`);
