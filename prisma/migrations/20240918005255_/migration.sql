/*
  Warnings:

  - You are about to drop the column `nomeclatura` on the `divergencias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "divergencias" DROP COLUMN "nomeclatura",
ADD COLUMN     "nomenclatura" TEXT;
