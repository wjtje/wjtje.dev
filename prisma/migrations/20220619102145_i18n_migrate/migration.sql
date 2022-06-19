-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'NL');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "language" "Language" NOT NULL DEFAULT E'EN',
ADD COLUMN     "slug" TEXT;
