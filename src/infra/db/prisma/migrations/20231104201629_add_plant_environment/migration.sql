/*
  Warnings:

  - You are about to drop the column `plantId` on the `Environment` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PlantEnvironment" (
    "plantId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,

    PRIMARY KEY ("plantId", "environmentId"),
    CONSTRAINT "PlantEnvironment_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlantEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
