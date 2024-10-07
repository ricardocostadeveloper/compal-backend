/*
  Warnings:

  - The primary key for the `cte_arquivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `destinatarioId` on the `cte_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `emitenteId` on the `cte_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `impostoId` on the `cte_arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `remeneteId` on the `cte_arquivo` table. All the data in the column will be lost.
  - The primary key for the `destinatario_arquivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `emitente_arquivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `imposto_arquivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `remetente_arquivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `cteId` to the `destinatario_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cteId` to the `emitente_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cteId` to the `imposto_arquivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cteId` to the `remetente_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_destinatarioId_fkey";

-- DropForeignKey
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_emitenteId_fkey";

-- DropForeignKey
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_impostoId_fkey";

-- DropForeignKey
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_remeneteId_fkey";

-- AlterTable
ALTER TABLE "cte_arquivo" DROP CONSTRAINT "cte_arquivo_pkey",
DROP COLUMN "destinatarioId",
DROP COLUMN "emitenteId",
DROP COLUMN "impostoId",
DROP COLUMN "remeneteId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cte_arquivo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cte_arquivo_id_seq";

-- AlterTable
ALTER TABLE "destinatario_arquivo" DROP CONSTRAINT "destinatario_arquivo_pkey",
ADD COLUMN     "cteId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "destinatario_arquivo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "destinatario_arquivo_id_seq";

-- AlterTable
ALTER TABLE "emitente_arquivo" DROP CONSTRAINT "emitente_arquivo_pkey",
ADD COLUMN     "cteId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "emitente_arquivo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "emitente_arquivo_id_seq";

-- AlterTable
ALTER TABLE "imposto_arquivo" DROP CONSTRAINT "imposto_arquivo_pkey",
ADD COLUMN     "cteId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "imposto_arquivo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "imposto_arquivo_id_seq";

-- AlterTable
ALTER TABLE "remetente_arquivo" DROP CONSTRAINT "remetente_arquivo_pkey",
ADD COLUMN     "cteId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "remetente_arquivo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "remetente_arquivo_id_seq";

-- AddForeignKey
ALTER TABLE "emitente_arquivo" ADD CONSTRAINT "emitente_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remetente_arquivo" ADD CONSTRAINT "remetente_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinatario_arquivo" ADD CONSTRAINT "destinatario_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imposto_arquivo" ADD CONSTRAINT "imposto_arquivo_cteId_fkey" FOREIGN KEY ("cteId") REFERENCES "cte_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
