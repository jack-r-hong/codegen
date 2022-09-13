/*
  Warnings:

  - A unique constraint covering the columns `[bank_account_verify_id,field]` on the table `BankAccountVerifyResonDes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BankAccountVerifyResonDes_bank_account_verify_id_field_key` ON `BankAccountVerifyResonDes`(`bank_account_verify_id`, `field`);
