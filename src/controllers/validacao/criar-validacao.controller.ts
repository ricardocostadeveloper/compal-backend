import { Controller, Post, UseGuards, Body, BadRequestException } from "@nestjs/common";
// import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
// import { CurrentUser } from "src/auth/current-user-decorator";
// import { UserPayLoad } from "src/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarValidacaoBodySchema = z.object({
  produtoId: z.string(),
  bidId: z.string(),
  cteId: z.string(),
  divergencias: z.array(
    z.object({
      nomenclatura: z.string(),
      valorEsperado: z.string(),
      valorDivergente: z.string(),
    })
  ).optional() // Pode ou não conter divergências
});

const bodyValidationPipe = new ZodValidationPipe(criarValidacaoBodySchema);

type CriarValidacaoBodySchema = z.infer<typeof criarValidacaoBodySchema>;

@Controller("/validacao")
// @UseGuards(JwtAuthGuard)
export class CriarValidacaoController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CriarValidacaoBodySchema,
    // @CurrentUser() user: UserPayLoad
  ) {
    const { produtoId, bidId, cteId, divergencias } = body;
    // const autorId = user.sub;
    const autorId = "5d63b590-dae1-4c83-b285-2cd9610d2cb1";

    // Verifica se produtoId existe
    const produtoExists = await this.prisma.produtos.findUnique({
      where: { id: produtoId },
    });
    if (!produtoExists) {
      throw new BadRequestException("Produto não encontrado.");
    }

    // Verifica se bidId existe
    const bidExists = await this.prisma.bid.findUnique({
      where: { id: bidId },
    });
    if (!bidExists) {
      throw new BadRequestException("Bid não encontrado.");
    }

    // Verifica se cteId existe
    const cteExists = await this.prisma.cteArquivo.findUnique({
      where: { id: cteId },
    });
    if (!cteExists) {
      throw new BadRequestException("Cte não encontrado.");
    }

    // Determina o status baseado na existência de divergências
    const status = divergencias && divergencias.length > 0 ? "Inválido" : "Válido";

    // Cria a validação junto com as divergências, caso existam
    const validacao = await this.prisma.validacao.create({
      data: {
        autorId,
        produtoId,
        bidId,
        cteId,
        status,
        divergencia: {
          create: divergencias?.map((divergencia) => ({
            nomenclatura: divergencia.nomenclatura,
            valorEsperado: divergencia.valorEsperado,
            valorDivergente: divergencia.valorDivergente,
          })),
        },
      },
    });

    return { message: "Validação criada com sucesso.", validacao };
  }
}