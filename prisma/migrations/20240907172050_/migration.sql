/*
  Warnings:

  - Added the required column `numeroCte` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "numeroCte" TEXT NOT NULL;
