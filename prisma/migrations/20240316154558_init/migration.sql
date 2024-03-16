-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "updatedBy" DROP NOT NULL;
