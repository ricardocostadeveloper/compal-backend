import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FreteService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar o produto pelo partNumber
  async getfreteByPartNumber(descricao: string) {
    return this.prisma.fretes.findFirst({
      where: {  descricao: {
        equals: descricao,
        mode: 'insensitive',  // Ignora a sensibilidade de caixa
      }, },
    });
  }
}
