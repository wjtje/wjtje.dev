-- CreateTable
CREATE TABLE "CurrentActivity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "titleUrl" TEXT,
    "subtitle" TEXT,
    "image" TEXT,
    "imageAlt" TEXT,
    "imageRounded" BOOLEAN NOT NULL DEFAULT true,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "CurrentActivity_pkey" PRIMARY KEY ("id")
);
