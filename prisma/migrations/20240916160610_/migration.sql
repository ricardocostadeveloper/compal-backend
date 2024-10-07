-- CreateTable
CREATE TABLE "Nfe" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "valorUnitario" TEXT NOT NULL,
    "valortotal" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cteId" TEXT NOT NULL,

    CONSTRAINT "Nfe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validacao" (
    "id" TEXT NOT NULL,
    "nfId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "cteId" TEXT NOT NULL,
    "valor_percentual_calculo" TEXT NOT NULL,
    "valor_icms" TEXT NOT NULL,

    CONSTRAINT "validacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divergencia" (
    "id" TEXT NOT NULL,
    "nomeclatura" TEXT NOT NULL,
    "valorEsperado" TEXT NOT NULL,
    "valorDivergente" TEXT NOT NULL,
    "validacaoId" TEXT NOT NULL,

    CONSTRAINT "divergencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nfe" ADD CONSTRAINT "Nfe_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_nfId_fkey" FOREIGN KEY ("nfId") REFERENCES "Nfe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validacao" ADD CONSTRAINT "validacao_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
