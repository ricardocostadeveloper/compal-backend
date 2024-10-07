-- CreateTable
CREATE TABLE "cte_arquivo" (
    "id" SERIAL NOT NULL,
    "chaveAcesso" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "serie" TEXT NOT NULL,
    "emissao" TIMESTAMP(3) NOT NULL,
    "valorTotal" DECIMAL(15,2) NOT NULL,
    "valorRecebido" DECIMAL(15,2) NOT NULL,
    "emitenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "transportadoraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cte_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emitente_arquivo" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,

    CONSTRAINT "emitente_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinatario_arquivo" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,

    CONSTRAINT "destinatario_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportadora_arquivo" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,

    CONSTRAINT "transportadora_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_arquivo" (
    "id" SERIAL NOT NULL,
    "cteId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" DECIMAL(10,3) NOT NULL,
    "valorUnitario" DECIMAL(15,2) NOT NULL,
    "valorTotal" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "produto_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imposto_arquivo" (
    "id" SERIAL NOT NULL,
    "cteId" INTEGER NOT NULL,
    "tipoImposto" TEXT NOT NULL,
    "valorImposto" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "imposto_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_arquivo" (
    "id" SERIAL NOT NULL,
    "cteId" INTEGER NOT NULL,
    "evento" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cte_arquivo_chaveAcesso_key" ON "cte_arquivo"("chaveAcesso");

-- CreateIndex
CREATE UNIQUE INDEX "emitente_arquivo_cnpj_key" ON "emitente_arquivo"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "destinatario_arquivo_cnpj_key" ON "destinatario_arquivo"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "transportadora_arquivo_cnpj_key" ON "transportadora_arquivo"("cnpj");

-- AddForeignKey
ALTER TABLE "cte_arquivo" ADD CONSTRAINT "cte_arquivo_emitenteId_fkey" FOREIGN KEY ("emitenteId") REFERENCES "emitente_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cte_arquivo" ADD CONSTRAINT "cte_arquivo_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "destinatario_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cte_arquivo" ADD CONSTRAINT "cte_arquivo_transportadoraId_fkey" FOREIGN KEY ("transportadoraId") REFERENCES "transportadora_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_arquivo" ADD CONSTRAINT "produto_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imposto_arquivo" ADD CONSTRAINT "imposto_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_arquivo" ADD CONSTRAINT "historico_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
