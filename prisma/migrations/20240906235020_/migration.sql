/*
  Warnings:

  - You are about to drop the column `modal` on the `cte_arquivo` table. All the data in the column will be lost.
  - Added the required column `modalCte` to the `cte_arquivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cte_arquivo" DROP COLUMN "modal",
ADD COLUMN     "modalCte" INTEGER NOT NULL;
