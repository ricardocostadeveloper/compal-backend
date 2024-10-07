/*
  Warnings:

  - Added the required column `serie` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "serie" TEXT NOT NULL,
ALTER COLUMN "modalCte" SET DATA TYPE TEXT;
