/*
  Warnings:

  - You are about to drop the column `serie` on the `cte_arquivo` table. All the data in the column will be lost.
  - Added the required column `impostoId` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "imposto_arquivo" DROP CONSTRAINT "imposto_arquivo_cteId_fkey";

-- AlterTable
ALTER TABLE "cte_arquivo" DROP COLUMN "serie",
ADD COLUMN     "impostoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cte_arquivo" ADD CONSTRAINT "cte_arquivo_impostoId_fkey" FOREIGN KEY ("impostoId") REFERENCES "imposto_arquivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
