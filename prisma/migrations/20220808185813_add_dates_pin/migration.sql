/*
  Warnings:

  - Added the required column `createdAt` to the `GithubRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinned` to the `GithubRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GithubRepo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubRepo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pinned" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
