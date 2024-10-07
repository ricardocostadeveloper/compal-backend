/*
  Warnings:

  - You are about to drop the `divergencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "divergencia";

-- CreateTable
CREATE TABLE "Divergencia" (
    "id" TEXT NOT NULL,
    "nomeclatura" TEXT NOT NULL,
    "valorEsperado" TEXT NOT NULL,
    "valorDivergente" TEXT NOT NULL,
    "validacaoId" TEXT NOT NULL,

    CONSTRAINT "Divergencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Divergencia" ADD CONSTRAINT "Divergencia_validacaoId_fkey" FOREIGN KEY ("validacaoId") REFERENCES "Validacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
