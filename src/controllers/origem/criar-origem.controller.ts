import { Controller, Post, UseGuards, Body, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarOrigemBodySchema = z.object({
  descricao: z.string(),
  // aereporto: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(criarOrigemBodySchema);

type CriarOrigemBodySchema = z.infer<typeof criarOrigemBodySchema>;

@Controller('/origem')
// @UseGuards(JwtAuthGuard)
export class CriarOrigemController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CriarOrigemBodySchema) {
    const { descricao } = body;
    const aereporto = "MAO"
    try {
      // Tenta inserir os dados no banco de dados
      await this.prisma.origem.create({
        data: {
          descricao,
          aereporto,
        },
      });
      return { message: 'Origem criada com sucesso.' };
    } catch (error) {
      // Verifica se o erro é relacionado à validação no banco de dados
        // Qualquer outro tipo de erro é tratado como erro interno
        throw new InternalServerErrorException('Erro ao criar a origem.');
    }
  }
}
