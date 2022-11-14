/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropPrimaryKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey";

-- AlterTable
ALTER TABLE IF EXISTS "Post" RENAME TO "Page";

-- CreatePrimaryLey
ALTER TABLE "Page" ADD CONSTRAINT "Page_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_language_key" ON "Page"("slug", "language");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
