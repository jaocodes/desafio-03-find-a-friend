/*
  Warnings:

  - Added the required column `animal_type` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('cat', 'dog');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animal_type" "AnimalType" NOT NULL;
