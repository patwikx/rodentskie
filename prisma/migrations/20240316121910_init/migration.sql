/*
  Warnings:

  - The `gFloorArea` column on the `Spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mezFloor` column on the `Spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `secFloor` column on the `Spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `thirdFloor` column on the `Spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roofTop` column on the `Spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `totalArea` on the `Spaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monthlyRent` on the `Spaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spaces" ALTER COLUMN "leasePeriod" DROP NOT NULL,
ALTER COLUMN "expiryDate" DROP NOT NULL,
DROP COLUMN "gFloorArea",
ADD COLUMN     "gFloorArea" DOUBLE PRECISION,
DROP COLUMN "mezFloor",
ADD COLUMN     "mezFloor" DOUBLE PRECISION,
DROP COLUMN "secFloor",
ADD COLUMN     "secFloor" DOUBLE PRECISION,
DROP COLUMN "thirdFloor",
ADD COLUMN     "thirdFloor" DOUBLE PRECISION,
DROP COLUMN "roofTop",
ADD COLUMN     "roofTop" DOUBLE PRECISION,
DROP COLUMN "totalArea",
ADD COLUMN     "totalArea" DOUBLE PRECISION NOT NULL,
DROP COLUMN "monthlyRent",
ADD COLUMN     "monthlyRent" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNo" TEXT NOT NULL;
