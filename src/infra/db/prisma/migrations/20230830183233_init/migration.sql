-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "waterTips" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "plantWaterFrequencyId" TEXT,
    CONSTRAINT "Plant_plantWaterFrequencyId_fkey" FOREIGN KEY ("plantWaterFrequencyId") REFERENCES "PlantWaterFrequency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlantWaterFrequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "gap" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PlantEnvironment" (
    "plantId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,

    PRIMARY KEY ("plantId", "environmentId"),
    CONSTRAINT "PlantEnvironment_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_plantWaterFrequencyId_key" ON "Plant"("plantWaterFrequencyId");
