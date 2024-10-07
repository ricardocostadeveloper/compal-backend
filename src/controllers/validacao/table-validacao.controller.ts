import { Controller, Get, UseGuards, Body, BadRequestException, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('0')  // Página inicial agora é 0
    .transform(Number)
    .pipe(
        z.number()
    )

const pageValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/validacao')
// @UseGuards(JwtAuthGuard)
export class TableValidacaoController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle(@Query('page', pageValidationPipe) page: PageQueryParamSchema) {
        const perPage = 10; // Quantidade de registros por página
        const totalValidacoes = await this.prisma.validacao.count(); // Total de registros

        const validacoes = await this.prisma.validacao.findMany({
            take: perPage,
            skip: page * perPage,  // Remove o -1 para começar do índice 0
            orderBy: {
                createdAt: 'asc',
            },
            select: {
                id: true,
                status: true,
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
                        _count: {
                            select: { nfe: true }, // Conta as notas fiscais associadas ao CTE
                        },
                        remetente: {
                            select: {
                                nome: true,
                                municipio: true,
                                estado: true,
                            },
                        },
                        destinatario: {
                            select: {
                                nome: true,
                                municipio: true,
                                estado: true,
                            },
                        },
                        nfe: {
                            select: {
                                valortotal: true,
                            },
                        },
                    },
                },
            },
        });

        const totalPages = Math.ceil(totalValidacoes / perPage);

        return {
            page,
            perPage,
            totalPages,
            totalValidacoes,
            validacoes,
        };
    }
}
