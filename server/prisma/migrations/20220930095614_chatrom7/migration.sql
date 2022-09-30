/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id,user_id,service_id]` on the table `TransactionChatroomCursor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TransactionChatroomCursor_transaction_id_user_id_service_id_key` ON `TransactionChatroomCursor`(`transaction_id`, `user_id`, `service_id`);
