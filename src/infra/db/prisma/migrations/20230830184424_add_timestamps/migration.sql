/*
  Warnings:

  - Added the required column `createdAt` to the `PlantWaterFrequency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PlantWaterFrequency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Environment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Environment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantWaterFrequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "gap" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlantWaterFrequency" ("gap", "id", "time", "title") SELECT "gap", "id", "time", "title" FROM "PlantWaterFrequency";
DROP TABLE "PlantWaterFrequency";
ALTER TABLE "new_PlantWaterFrequency" RENAME TO "PlantWaterFrequency";
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "waterTips" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "plantWaterFrequencyId" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plant_plantWaterFrequencyId_fkey" FOREIGN KEY ("plantWaterFrequencyId") REFERENCES "PlantWaterFrequency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("description", "id", "name", "photo", "plantWaterFrequencyId", "waterTips") SELECT "description", "id", "name", "photo", "plantWaterFrequencyId", "waterTips" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
CREATE UNIQUE INDEX "Plant_plantWaterFrequencyId_key" ON "Plant"("plantWaterFrequencyId");
CREATE TABLE "new_Environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Environment" ("id", "title") SELECT "id", "title" FROM "Environment";
DROP TABLE "Environment";
ALTER TABLE "new_Environment" RENAME TO "Environment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
