/*
  Warnings:

  - Added the required column `owner` to the `GithubRepo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubRepo" ADD COLUMN     "owner" TEXT NOT NULL;
