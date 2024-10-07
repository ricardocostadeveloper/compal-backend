-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "partnumber_cliente" TEXT NOT NULL,
    "peso_unitario" TEXT NOT NULL,
    "dimencao_caixa" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "autor_id" TEXT NOT NULL,
    "palete_id" TEXT NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paletes" (
    "id" TEXT NOT NULL,
    "dimencao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "paletes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "aereporto" TEXT NOT NULL,

    CONSTRAINT "destinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "origens" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "aereporto" TEXT NOT NULL,

    CONSTRAINT "origens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportadoras" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "transportadoras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "tipo_modal" TEXT NOT NULL,
    "origem_id" TEXT NOT NULL,
    "destino_id" TEXT NOT NULL,
    "transportadora_id" TEXT NOT NULL,
    "autor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seguro_transportadora" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,

    CONSTRAINT "seguro_transportadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outros" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,

    CONSTRAINT "outros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valor_geral_drr" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,

    CONSTRAINT "valor_geral_drr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cte" (
    "id" TEXT NOT NULL,
    "numero_cte" TEXT NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "valor_frete" TEXT NOT NULL,
    "data_solicitacao" TEXT NOT NULL,
    "nome_transportadora" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "endereco_id" TEXT NOT NULL,

    CONSTRAINT "cte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notas_fiscais" (
    "id" TEXT NOT NULL,
    "numero_nf" TEXT NOT NULL,
    "cte_id" TEXT NOT NULL,

    CONSTRAINT "notas_fiscais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos_nf" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nf_id" TEXT NOT NULL,

    CONSTRAINT "produtos_nf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_partNumber_key" ON "produtos"("partNumber");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_partnumber_cliente_key" ON "produtos"("partnumber_cliente");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_palete_id_fkey" FOREIGN KEY ("palete_id") REFERENCES "paletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_origem_id_fkey" FOREIGN KEY ("origem_id") REFERENCES "origens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "destinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_transportadora_id_fkey" FOREIGN KEY ("transportadora_id") REFERENCES "transportadoras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguro_transportadora" ADD CONSTRAINT "seguro_transportadora_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outros" ADD CONSTRAINT "outros_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valor_geral_drr" ADD CONSTRAINT "valor_geral_drr_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cte" ADD CONSTRAINT "cte_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notas_fiscais" ADD CONSTRAINT "notas_fiscais_cte_id_fkey" FOREIGN KEY ("cte_id") REFERENCES "cte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_nf" ADD CONSTRAINT "produtos_nf_nf_id_fkey" FOREIGN KEY ("nf_id") REFERENCES "notas_fiscais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
