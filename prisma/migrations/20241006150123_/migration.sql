/*
  Warnings:

  - You are about to drop the column `dimencao_caixa` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `dimensao_caixa` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "dimencao_caixa",
ADD COLUMN     "dimensao_caixa" TEXT NOT NULL;
