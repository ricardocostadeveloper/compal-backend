/*
  Warnings:

  - You are about to drop the column `numero` on the `cte_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `transportadoraId` on the `cte_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `cte_arquivo` table. All the data in the column will be lost.
  - Added the required column `modal` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorFretePeso` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorTaxa` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorfrete` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" DROP COLUMN "numero",
DROP COLUMN "transportadoraId",
DROP COLUMN "valorTotal",
ADD COLUMN     "modal" INTEGER NOT NULL,
ADD COLUMN     "valorFretePeso" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorTaxa" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorfrete" DECIMAL(15,2) NOT NULL;
