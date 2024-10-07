import { Controller, Get, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/selectdestino')
export class DestinoSelectController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listarDadosCombinados() {
    // Obter dados da tabela ValorGeralDrr
    const valores = await this.prisma.destino.findMany({
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
