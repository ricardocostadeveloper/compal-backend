/*
  Warnings:

  - Added the required column `cpfMotorista` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeMotorista` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placaMotorista` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "cpfMotorista" TEXT NOT NULL,
ADD COLUMN     "nomeMotorista" TEXT NOT NULL,
ADD COLUMN     "placaMotorista" TEXT NOT NULL;
