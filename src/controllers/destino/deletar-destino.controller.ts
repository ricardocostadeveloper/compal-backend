import { Controller, Delete, Param, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/destino')
// @UseGuards(JwtAuthGuard)
export class DeletarDestinoController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  async deleteDestino(@Param('id') id: string) {
    try {
      // Verifica se a origem existe antes de tentar deletar
      const origem = await this.prisma.destino.findUnique({
        where: { id },
      });

      if (!origem) {
        throw new NotFoundException('Destino não encontrada.');
      }

      // Tenta deletar a origem
      await this.prisma.origem.delete({
        where: { id },
      });

      return { message: 'Destino deletada com sucesso.' };
    } catch (error: unknown) {
        // fazer depois  tratativa de erro de FK
      // Verifica se o erro é uma violação de chave estrangeira
    //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //     // if (error.code === 'P2003') {
    //       throw new BadRequestException(
    //         'Não é possível deletar esta origem, pois ela pode está referenciada em outra tabela.'
    //       );
    //     // }
    //   }

      // Caso seja outro tipo de erro, lança um erro interno genérico
      throw new InternalServerErrorException('Erro ao deletar a destino.');
    }
  }
}
