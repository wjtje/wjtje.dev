/*
  Warnings:

  - You are about to drop the column `authorId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Page` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('BLOG', 'REPO');

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_authorId_fkey";

-- AlterTable
ALTER TABLE "Page" RENAME COLUMN "authorId" TO "ownerId";
ALTER TABLE "Page" RENAME COLUMN "published" TO "visable";
ALTER TABLE "Page" ADD COLUMN "pageType" "PageType" NOT NULL DEFAULT 'BLOG';

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
