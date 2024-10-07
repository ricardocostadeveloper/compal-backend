/*
  Warnings:

  - You are about to drop the column `peso_id` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `pesos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_peso_id_fkey";

-- AlterTable
ALTER TABLE "pesos" ADD COLUMN     "produtoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "peso_id";

-- AlterTable
ALTER TABLE "validacao" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "pesos" ADD CONSTRAINT "pesos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
