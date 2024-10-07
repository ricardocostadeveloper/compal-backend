/*
  Warnings:

  - You are about to drop the `Divergencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Divergencia" DROP CONSTRAINT "Divergencia_validacaoId_fkey";

-- DropTable
DROP TABLE "Divergencia";

-- CreateTable
CREATE TABLE "Divergencias" (
    "id" TEXT NOT NULL,
    "nomeclatura" TEXT NOT NULL,
    "valorEsperado" TEXT NOT NULL,
    "valorDivergente" TEXT NOT NULL,
    "validacaoId" TEXT NOT NULL,

    CONSTRAINT "Divergencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Divergencias" ADD CONSTRAINT "Divergencias_validacaoId_fkey" FOREIGN KEY ("validacaoId") REFERENCES "Validacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
