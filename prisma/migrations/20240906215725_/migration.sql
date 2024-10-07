/*
  Warnings:

  - You are about to drop the column `cidade` on the `destinatario_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `destinatario_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `emitente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `emitente_arquivo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inscricaoEstadual]` on the table `emitente_arquivo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `remeneteId` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fone` to the `destinatario_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricaoEstadual` to the `emitente_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeFantasia` to the `emitente_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "remeneteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "destinatario_arquivo" DROP COLUMN "cidade",
DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "codMunicipio" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "fone" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT,
ADD COLUMN     "municipio" TEXT,
ADD COLUMN     "numero" TEXT;

-- AlterTable
ALTER TABLE "emitente_arquivo" DROP COLUMN "cidade",
DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "codMunicipio" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "inscricaoEstadual" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT,
ADD COLUMN     "municipio" TEXT,
ADD COLUMN     "nomeFantasia" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "telefone" TEXT;

-- CreateTable
CREATE TABLE "fretes" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorMinimo" TEXT NOT NULL,
    "valorMaximo" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,

    CONSTRAINT "fretes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remetente_arquivo" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "inscricaoEstadual" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "logradouro" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "municipio" TEXT,
    "codMunicipio" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "telefone" TEXT,

    CONSTRAINT "remetente_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "remetente_arquivo_cnpj_key" ON "remetente_arquivo"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "remetente_arquivo_inscricaoEstadual_key" ON "remetente_arquivo"("inscricaoEstadual");

-- CreateIndex
CREATE UNIQUE INDEX "emitente_arquivo_inscricaoEstadual_key" ON "emitente_arquivo"("inscricaoEstadual");

-- AddForeignKey
ALTER TABLE "fretes" ADD CONSTRAINT "fretes_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cte_arquivo" ADD CONSTRAINT "cte_arquivo_remeneteId_fkey" FOREIGN KEY ("remeneteId") REFERENCES "remetente_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
