/*
  Warnings:

  - You are about to drop the `Lane` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pipeline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTicket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[propertyCode]` on the table `Properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyCode` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lane" DROP CONSTRAINT "Lane_pipelineId_fkey";

-- DropForeignKey
ALTER TABLE "Pipeline" DROP CONSTRAINT "Pipeline_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_laneId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTicket" DROP CONSTRAINT "_TagToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTicket" DROP CONSTRAINT "_TagToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "cityRegion" TEXT,
ADD COLUMN     "classification" TEXT,
ADD COLUMN     "landBuilding" TEXT,
ADD COLUMN     "leasableArea" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "lotNo" TEXT,
ADD COLUMN     "orate" TEXT,
ADD COLUMN     "propertyCode" TEXT NOT NULL,
ADD COLUMN     "propertyImage" TEXT,
ADD COLUMN     "taxDecNo" TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "propertyName" DROP NOT NULL,
ALTER COLUMN "regOwnerName" DROP NOT NULL,
ALTER COLUMN "titleNo" DROP NOT NULL,
ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Spaces" ADD COLUMN     "spacesImage" TEXT;

-- DropTable
DROP TABLE "Lane";

-- DropTable
DROP TABLE "Pipeline";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "_TagToTicket";

-- CreateIndex
CREATE UNIQUE INDEX "Properties_propertyCode_key" ON "Properties"("propertyCode");
