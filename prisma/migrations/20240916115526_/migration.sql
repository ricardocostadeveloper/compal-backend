/*
  Warnings:

  - You are about to drop the column `palete_id` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `partnumber_cliente` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `peso_unitario` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the `paletes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[part_number_filho]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `part_number_filho` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_id` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_palete_id_fkey";

-- DropIndex
DROP INDEX "produtos_partnumber_cliente_key";

-- AlterTable
ALTER TABLE "cte_arquivo" ADD COLUMN     "numeroPedido" TEXT;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "palete_id",
DROP COLUMN "partnumber_cliente",
DROP COLUMN "peso_unitario",
ADD COLUMN     "part_number_filho" TEXT NOT NULL,
ADD COLUMN     "peso_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "paletes";

-- CreateTable
CREATE TABLE "pesos" (
    "id" TEXT NOT NULL,
    "dimencao" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "upper" TEXT NOT NULL,
    "lower" TEXT NOT NULL,
    "quantidade_max" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "pesos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_part_number_filho_key" ON "produtos"("part_number_filho");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_peso_id_fkey" FOREIGN KEY ("peso_id") REFERENCES "pesos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
