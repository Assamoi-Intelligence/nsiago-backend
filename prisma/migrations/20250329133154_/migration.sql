/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Subscription` table. All the data in the column will be lost.
  - The `status` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ciNumber]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[immatriculation]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `circulationDate` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryCode` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciNumber` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `circulationDate` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doors` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `immatriculation` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_categoryCode_fkey";

-- AlterTable
ALTER TABLE "Simulation" ADD COLUMN     "circulationDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "vehicleId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "categoryCode" TEXT NOT NULL,
ADD COLUMN     "ciNumber" TEXT NOT NULL,
ADD COLUMN     "circulationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "doors" INTEGER NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "immatriculation" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "seats" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Vehicle";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_ciNumber_key" ON "Subscription"("ciNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_immatriculation_key" ON "Subscription"("immatriculation");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
