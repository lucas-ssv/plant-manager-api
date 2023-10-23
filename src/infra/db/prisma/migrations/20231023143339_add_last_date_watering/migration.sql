/*
  Warnings:

  - You are about to drop the column `title` on the `PlantWaterFrequency` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `PlantWaterFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `description` to the `PlantWaterFrequency` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantWaterFrequency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "gap" INTEGER NOT NULL,
    "lastDateWatering" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlantWaterFrequency" ("createdAt", "gap", "id", "time", "updatedAt") SELECT "createdAt", "gap", "id", "time", "updatedAt" FROM "PlantWaterFrequency";
DROP TABLE "PlantWaterFrequency";
ALTER TABLE "new_PlantWaterFrequency" RENAME TO "PlantWaterFrequency";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
