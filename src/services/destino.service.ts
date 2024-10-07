import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinoService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar o produto pelo partNumber
  async getDestinoByPartNumber(aereporto: string) {
    return this.prisma.destino.findMany({
      where: { aereporto },
    });
  }
}
