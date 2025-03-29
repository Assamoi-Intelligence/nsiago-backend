/*
  Warnings:

  - You are about to drop the column `reference` on the `Simulation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quoteReference]` on the table `Simulation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quoteReference` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueNew` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueVenal` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Simulation" DROP CONSTRAINT "Simulation_vehicleId_fkey";

-- DropIndex
DROP INDEX "Simulation_reference_key";

-- AlterTable
ALTER TABLE "Simulation" DROP COLUMN "reference",
ADD COLUMN     "power" INTEGER,
ADD COLUMN     "quoteReference" TEXT NOT NULL,
ADD COLUMN     "valueNew" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valueVenal" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Simulation_quoteReference_key" ON "Simulation"("quoteReference");
