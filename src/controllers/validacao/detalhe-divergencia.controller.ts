import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('divergencias')
export class DetalhesDivergenciaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('validacao/:id')
  async getDivergenciasByValidacaoId(@Param('id') validacaoId: string) {
    return this.prisma.divergencias.findMany({
      where: {
        validacaoId, // Assume que há um campo validacaoId na tabela de divergências
      },
    });
  }
}
