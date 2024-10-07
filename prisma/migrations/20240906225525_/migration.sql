/*
  Warnings:

  - You are about to drop the column `nome_cliente` on the `cte` table. All the data in the column will be lost.
  - You are about to drop the column `valor_frete` on the `cte` table. All the data in the column will be lost.
  - You are about to drop the column `codMunicipio` on the `destinatario_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `codMunicipio` on the `emitente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `inscricaoEstadual` on the `emitente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFantasia` on the `emitente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `tipoImposto` on the `imposto_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `valorImposto` on the `imposto_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `codMunicipio` on the `remetente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `inscricaoEstadual` on the `remetente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFantasia` on the `remetente_arquivo` table. All the data in the column will be lost.
  - You are about to drop the `enderecos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historico_arquivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto_arquivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transportadora_arquivo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[chaveNf]` on the table `notas_fiscais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modal` to the `cte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacao` to the `cte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricao_estadual` to the `emitente_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_fantasia` to the `emitente_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_base_calculo` to the `imposto_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_icms` to the `imposto_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_percentual_calculo` to the `imposto_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chaveNf` to the `notas_fiscais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeCarga` to the `notas_fiscais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorCarga` to the `notas_fiscais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorPesoCubado` to the `notas_fiscais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorVolumes` to the `notas_fiscais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricao_estadual` to the `remetente_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_fantasia` to the `remetente_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cte" DROP CONSTRAINT "cte_endereco_id_fkey";

-- DropForeignKey
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_transportadoraId_fkey";

-- DropForeignKey
ALTER TABLE "historico_arquivo" DROP CONSTRAINT "historico_arquivo_cteId_fkey";

-- DropForeignKey
ALTER TABLE "produto_arquivo" DROP CONSTRAINT "produto_arquivo_cteId_fkey";

-- DropIndex
DROP INDEX "emitente_arquivo_inscricaoEstadual_key";

-- DropIndex
DROP INDEX "remetente_arquivo_inscricaoEstadual_key";

-- AlterTable
ALTER TABLE "cte" DROP COLUMN "nome_cliente",
DROP COLUMN "valor_frete",
ADD COLUMN     "modal" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "destinatario_arquivo" DROP COLUMN "codMunicipio",
ADD COLUMN     "cod_municipio" TEXT;

-- AlterTable
ALTER TABLE "emitente_arquivo" DROP COLUMN "codMunicipio",
DROP COLUMN "inscricaoEstadual",
DROP COLUMN "nomeFantasia",
ADD COLUMN     "cod_municipio" TEXT,
ADD COLUMN     "inscricao_estadual" TEXT NOT NULL,
ADD COLUMN     "nome_fantasia" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "imposto_arquivo" DROP COLUMN "tipoImposto",
DROP COLUMN "valorImposto",
ADD COLUMN     "valor_base_calculo" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valor_icms" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valor_percentual_calculo" DECIMAL(15,2) NOT NULL;

-- AlterTable
ALTER TABLE "notas_fiscais" ADD COLUMN     "chaveNf" TEXT NOT NULL,
ADD COLUMN     "quantidadeCarga" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorCarga" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorPesoCubado" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "valorVolumes" DECIMAL(15,2) NOT NULL;

-- AlterTable
ALTER TABLE "remetente_arquivo" DROP COLUMN "codMunicipio",
DROP COLUMN "inscricaoEstadual",
DROP COLUMN "nomeFantasia",
ADD COLUMN     "cod_municipio" TEXT,
ADD COLUMN     "inscricao_estadual" TEXT NOT NULL,
ADD COLUMN     "nome_fantasia" TEXT NOT NULL;

-- DropTable
DROP TABLE "enderecos";

-- DropTable
DROP TABLE "historico_arquivo";

-- DropTable
DROP TABLE "produto_arquivo";

-- DropTable
DROP TABLE "transportadora_arquivo";

-- CreateIndex
CREATE UNIQUE INDEX "notas_fiscais_chaveNf_key" ON "notas_fiscais"("chaveNf");
