/*
  Warnings:

  - Added the required column `quantidade` to the `Nfe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nfe" ADD COLUMN     "quantidade" TEXT NOT NULL;
