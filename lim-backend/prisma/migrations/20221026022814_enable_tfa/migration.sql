/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "enableTfa" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tfaCode" TEXT,
ADD COLUMN     "tfaTime" TIMESTAMP(3);
