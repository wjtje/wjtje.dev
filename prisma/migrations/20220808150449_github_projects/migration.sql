-- CreateTable
CREATE TABLE "GithubRepo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "fork" BOOLEAN NOT NULL,
    "parentName" TEXT,
    "parentUrl" TEXT,
    "language" TEXT,
    "forksCount" INTEGER NOT NULL,
    "stargazersCount" INTEGER NOT NULL,
    "topics" TEXT,
    "image" TEXT,

    CONSTRAINT "GithubRepo_pkey" PRIMARY KEY ("id")
);
