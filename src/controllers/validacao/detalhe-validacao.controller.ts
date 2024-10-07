import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/validacao')
export class DetalhesValidacaoController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    // Busca a validação pelo ID
    const validacao = await this.prisma.validacao.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        createdAt: true,
        autorId: true,
        produtoId: true,
        bid: {
          select: {
            transportadora: {
              select: {
                descricao: true,
              },
            },
          },
        },
        cte: {
          select: {
            numeroPedido: true,
            numeroCte: true,
            _count: { select: { nfe: true } },
            remetente: { select: { nome: true, municipio: true, estado: true } },
            destinatario: { select: { nome: true, municipio: true, estado: true } },
            nfe: {
              select: {
                chave: true,
                quantidade: true,
                partNumber: true,
                descricao: true,
                valorUnitario: true,
                valortotal: true
              },
            },
          },
        },
      },
    });

    if (!validacao) {
      throw new NotFoundException("Validação não encontrada");
    }

    const cte = validacao.cte;
    const bid = validacao.bid;

    // Transformando os dados para o formato desejado
    const resultado = {
      id: validacao.id,
      N_cte: cte.numeroCte,
      N_pedido: cte.numeroPedido,
      transportadora: bid.transportadora.descricao,
      cliente: cte.remetente[0]?.nome || 'Cliente não informado',
      valor_frete_pedido: "559.615,14 R$", // mudar esse campo depois
      valor_total_pedido: "34.615,14 R$", //  mudar esse campo depois
      notas_fiscais: cte.nfe.map((nota) => ({
        n_nota: nota.chave,
        items: [
          {
            quantidade: nota.quantidade,
            part_number: nota.partNumber,
            descricao: nota.descricao,
            valor_unitario: `${nota.valorUnitario} R$`,
            valor_total: `${nota.valortotal} R$`,
          }
        ]
      }))
    };

    return [resultado];
  }
}
