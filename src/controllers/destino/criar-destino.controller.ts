import { Controller, Post, UseGuards, Body, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarDestinoBodySchema = z.object({
  descricao: z.string(),
  // aereporto: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(criarDestinoBodySchema);

type CriarDestinoBodySchema = z.infer<typeof criarDestinoBodySchema>;

@Controller('/destino')
// @UseGuards(JwtAuthGuard)
export class CriarDestinoController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CriarDestinoBodySchema) {
    const { descricao } = body;
    const aereporto = "MAO"
    try {
      // Tenta inserir os dados no banco de dados
      await this.prisma.destino.create({
        data: {
          descricao,
          aereporto,
        },
      });
      return { message: 'Destino criado com sucesso.' };
    } catch (error) {
      // Verifica se o erro é relacionado à validação no banco de dados
        // Qualquer outro tipo de erro é tratado como erro interno
        throw new InternalServerErrorException('Erro ao criar o destino.');
    }
  }
}
