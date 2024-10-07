/*
  Warnings:

  - Added the required column `inscricao_estadual` to the `destinatario_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destinatario_arquivo" ADD COLUMN     "inscricao_estadual" TEXT NOT NULL;
