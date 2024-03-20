-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Administrator', 'SysUser', 'Tenant');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Administrator',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "contactNo" TEXT,
    "address" TEXT,
    "emailVerified" TIMESTAMP(3),
    "tenantImage" TEXT,
    "UserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "propertyCode" TEXT NOT NULL,
    "propertyName" TEXT,
    "regOwnerName" TEXT,
    "titleNo" TEXT,
    "landBuilding" TEXT,
    "lotNo" TEXT,
    "location" TEXT,
    "cityRegion" TEXT,
    "classification" TEXT,
    "leasableArea" TEXT,
    "orate" TEXT,
    "taxDecNo" TEXT,
    "propertyImage" TEXT,
    "sysUserId" TEXT NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spaces" (
    "id" TEXT NOT NULL,
    "spaceName" TEXT NOT NULL,
    "oStatus" TEXT NOT NULL,
    "leasePeriod" TEXT,
    "expiryDate" TIMESTAMP(3),
    "gFloorArea" DOUBLE PRECISION,
    "mezFloor" DOUBLE PRECISION,
    "secFloor" DOUBLE PRECISION,
    "thirdFloor" DOUBLE PRECISION,
    "roofTop" DOUBLE PRECISION,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "spacesImage" TEXT,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "billName" TEXT NOT NULL,
    "billAmount" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "sysUserId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "attachmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "compoundId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_propertyCode_key" ON "Properties"("propertyCode");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_attachmentId_key" ON "Billing"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_compoundId_key" ON "Account"("compoundId");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_sysUserId_fkey" FOREIGN KEY ("sysUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spaces" ADD CONSTRAINT "Spaces_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_sysUserId_fkey" FOREIGN KEY ("sysUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
