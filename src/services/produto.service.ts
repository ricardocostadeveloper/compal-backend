import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar o produto pelo partNumber
  async getProdutoByPartNumber(partNumber: string) {
    return this.prisma.produtos.findUnique({
      where: { partNumber },
    });
  }
}
