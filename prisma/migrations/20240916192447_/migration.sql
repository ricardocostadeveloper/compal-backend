/*
  Warnings:

  - You are about to drop the `Divergencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Validacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Divergencias" DROP CONSTRAINT "Divergencias_validacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Validacao" DROP CONSTRAINT "Validacao_autorId_fkey";

-- DropForeignKey
ALTER TABLE "Validacao" DROP CONSTRAINT "Validacao_bidId_fkey";

-- DropForeignKey
ALTER TABLE "Validacao" DROP CONSTRAINT "Validacao_cteId_fkey";

-- DropForeignKey
ALTER TABLE "Validacao" DROP CONSTRAINT "Validacao_produtoId_fkey";

-- DropTable
DROP TABLE "Divergencias";

-- DropTable
DROP TABLE "Validacao";

-- CreateTable
CREATE TABLE "validacao" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "cteId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,

    CONSTRAINT "validacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divergencias" (
    "id" TEXT NOT NULL,
    "nomeclatura" TEXT NOT NULL,
    "valorEsperado" TEXT NOT NULL,
    "valorDivergente" TEXT NOT NULL,
    "validacaoId" TEXT NOT NULL,

    CONSTRAINT "divergencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divergencias" ADD CONSTRAINT "divergencias_validacaoId_fkey" FOREIGN KEY ("validacaoId") REFERENCES "validacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
