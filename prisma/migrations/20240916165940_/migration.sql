/*
  Warnings:

  - Changed the type of `valorUnitario` on the `Nfe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `valortotal` on the `Nfe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quantidade` on the `Nfe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Nfe" DROP COLUMN "valorUnitario",
ADD COLUMN     "valorUnitario" DOUBLE PRECISION NOT NULL,
DROP COLUMN "valortotal",
ADD COLUMN     "valortotal" DOUBLE PRECISION NOT NULL,
DROP COLUMN "quantidade",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
