import { Controller, Get, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/selectseguros')
export class SeguroSelectController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listarDadosCombinados() {
    // Obter descrições da tabela ValorGeralDrr
    const valores = await this.prisma.valorGeralDrr.findMany({
      select: {
        descricao: true,
      },
    });

    // Obter descrições da tabela SeguroTransportadora
    const seguros = await this.prisma.seguroTransportadora.findMany({
      select: {
        descricao: true,
      },
    });

    if ((!valores || valores.length === 0) && (!seguros || seguros.length === 0)) {
      throw new NotFoundException('Nenhum dado encontrado');
    }

    // Mesclar as descrições em um único array
    const descricoesCombinadas = [
      ...valores.map(valor => valor.descricao),
      ...seguros.map(seguro => seguro.descricao),
    ];

    return descricoesCombinadas;
  }
}
