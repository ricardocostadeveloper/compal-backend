/*
  Warnings:

  - You are about to drop the column `part_number_filho` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the `pesos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pesos" DROP CONSTRAINT "pesos_produtoId_fkey";

-- DropIndex
DROP INDEX "produtos_part_number_filho_key";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "part_number_filho",
ADD COLUMN     "lower" TEXT,
ADD COLUMN     "quantidade_max" TEXT,
ADD COLUMN     "standard" TEXT,
ADD COLUMN     "upper" TEXT;

-- DropTable
DROP TABLE "pesos";
