-- CreateTable
CREATE TABLE "MapCompleteTheme" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "name" TEXT,
    "iconUrl" TEXT,

    CONSTRAINT "MapCompleteTheme_pkey" PRIMARY KEY ("id")
);
