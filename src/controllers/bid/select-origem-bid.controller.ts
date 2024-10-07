import { Controller, Get, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/selectorigem')
export class OrigemSelectController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listarDadosCombinados() {
    // Obter dados da tabela ValorGeralDrr
    const valores = await this.prisma.origem.findMany({
      select: {
        descricao: true,
      },
    });
    if ((!valores || valores.length === 0)) {
      throw new NotFoundException('Nenhum dado encontrado');
    }

    // Mesclar os dados em um array simples
    const dadosCombinados = [
      ...valores.map(valor =>  valor.descricao)
    ];

    return dadosCombinados;
  }
}
