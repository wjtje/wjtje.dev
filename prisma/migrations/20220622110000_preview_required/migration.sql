/*
  Warnings:

  - Made the column `preview` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "preview" SET NOT NULL;
