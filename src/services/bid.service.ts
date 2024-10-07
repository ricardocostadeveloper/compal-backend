import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar o produto pelo partNumber
  async getBidByPartNumber(id: string) {
    return this.prisma.bid.findUnique({
      where: { id },
    });
  }
}
