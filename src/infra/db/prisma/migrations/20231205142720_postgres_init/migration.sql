-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "waterTips" TEXT,
    "photo" TEXT,
    "plantWaterFrequencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantWaterFrequency" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "gap" INTEGER NOT NULL,
    "lastDateWatering" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlantWaterFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantEnvironment" (
    "plantId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,

    CONSTRAINT "PlantEnvironment_pkey" PRIMARY KEY ("plantId","environmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_plantWaterFrequencyId_key" ON "Plant"("plantWaterFrequencyId");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantWaterFrequencyId_fkey" FOREIGN KEY ("plantWaterFrequencyId") REFERENCES "PlantWaterFrequency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantEnvironment" ADD CONSTRAINT "PlantEnvironment_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantEnvironment" ADD CONSTRAINT "PlantEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
