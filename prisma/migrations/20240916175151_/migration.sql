/*
  Warnings:

  - You are about to drop the `validacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "validacao" DROP CONSTRAINT "validacao_bidId_fkey";

-- DropForeignKey
ALTER TABLE "validacao" DROP CONSTRAINT "validacao_cteId_fkey";

-- DropForeignKey
ALTER TABLE "validacao" DROP CONSTRAINT "validacao_nfId_fkey";

-- DropForeignKey
ALTER TABLE "validacao" DROP CONSTRAINT "validacao_produtoId_fkey";

-- DropTable
DROP TABLE "validacao";

-- CreateTable
CREATE TABLE "Validacao" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "cteId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Validacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Validacao" ADD CONSTRAINT "Validacao_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validacao" ADD CONSTRAINT "Validacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validacao" ADD CONSTRAINT "Validacao_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Validacao" ADD CONSTRAINT "Validacao_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
