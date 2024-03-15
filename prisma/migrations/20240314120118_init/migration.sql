-- CreateTable
CREATE TABLE "User" (
    "ind" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ind")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
