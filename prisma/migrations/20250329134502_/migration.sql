/*
  Warnings:

  - You are about to drop the column `categoryCode` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `vehicleCategoryCode` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_categoryCode_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "categoryCode",
ADD COLUMN     "vehicleCategoryCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_vehicleCategoryCode_fkey" FOREIGN KEY ("vehicleCategoryCode") REFERENCES "Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
