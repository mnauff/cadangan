-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "propertyName" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "bedroom" DROP NOT NULL,
ALTER COLUMN "bathroom" DROP NOT NULL,
ALTER COLUMN "buildingArea" DROP NOT NULL,
ALTER COLUMN "landArea" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "propertyImage" DROP NOT NULL;
