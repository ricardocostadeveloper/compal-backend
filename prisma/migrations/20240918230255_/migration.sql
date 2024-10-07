/*
  Warnings:

  - You are about to drop the column `valorMaximo` on the `fretes` table. All the data in the column will be lost.
  - Added the required column `valorKg` to the `fretes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fretes" DROP COLUMN "valorMaximo",
ADD COLUMN     "valorKg" TEXT NOT NULL;
