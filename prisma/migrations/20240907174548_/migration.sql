/*
  Warnings:

  - Added the required column `valorCarga` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorPesoBruto` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorPesoCubado` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorVolumes` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "valorCarga" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorPesoBruto" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorPesoCubado" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorVolumes" DECIMAL(15,2) NOT NULL;
