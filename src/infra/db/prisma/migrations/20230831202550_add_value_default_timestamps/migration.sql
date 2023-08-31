-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Environment" ("createdAt", "id", "title", "updatedAt") SELECT "createdAt", "id", "title", "updatedAt" FROM "Environment";
DROP TABLE "Environment";
ALTER TABLE "new_Environment" RENAME TO "Environment";
CREATE TABLE "new_PlantWaterFrequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "gap" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlantWaterFrequency" ("createdAt", "gap", "id", "time", "title", "updatedAt") SELECT "createdAt", "gap", "id", "time", "title", "updatedAt" FROM "PlantWaterFrequency";
DROP TABLE "PlantWaterFrequency";
ALTER TABLE "new_PlantWaterFrequency" RENAME TO "PlantWaterFrequency";
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "waterTips" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "plantWaterFrequencyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plant_plantWaterFrequencyId_fkey" FOREIGN KEY ("plantWaterFrequencyId") REFERENCES "PlantWaterFrequency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("createdAt", "description", "id", "name", "photo", "plantWaterFrequencyId", "updatedAt", "waterTips") SELECT "createdAt", "description", "id", "name", "photo", "plantWaterFrequencyId", "updatedAt", "waterTips" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
CREATE UNIQUE INDEX "Plant_plantWaterFrequencyId_key" ON "Plant"("plantWaterFrequencyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
