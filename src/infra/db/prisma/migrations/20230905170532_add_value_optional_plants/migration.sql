-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "waterTips" TEXT,
    "photo" TEXT,
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
