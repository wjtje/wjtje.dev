/*
  Warnings:

  - A unique constraint covering the columns `[slug,language]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_language_key" ON "Post"("slug", "language");
