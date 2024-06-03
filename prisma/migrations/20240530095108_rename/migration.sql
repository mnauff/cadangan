/*
  Warnings:

  - You are about to drop the column `image` on the `Property` table. All the data in the column will be lost.
  - Added the required column `year` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyImage` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "image",
ADD COLUMN     "propertyImage" TEXT NOT NULL;
