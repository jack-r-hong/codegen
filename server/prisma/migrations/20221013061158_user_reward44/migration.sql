/*
  Warnings:

  - A unique constraint covering the columns `[startDate,endDate,user_id]` on the table `user_accumulated_reward` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_accumulated_reward_startDate_endDate_user_id_key` ON `user_accumulated_reward`(`startDate`, `endDate`, `user_id`);
