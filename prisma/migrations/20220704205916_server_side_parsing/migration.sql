-- CreateTable
CREATE TABLE "RemoteSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3),

    CONSTRAINT "RemoteSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemoteData" (
    "id" SERIAL NOT NULL,
    "remoteSourceId" INTEGER NOT NULL,
    "mainTitle" TEXT NOT NULL,
    "subTitle" TEXT,
    "date" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "RemoteData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RemoteData" ADD CONSTRAINT "RemoteData_remoteSourceId_fkey" FOREIGN KEY ("remoteSourceId") REFERENCES "RemoteSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
