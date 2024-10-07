import {Controller,Get,UseGuards,Body,BadRequestException,Query} from "@nestjs/common";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {ZodValidationPipe} from "src/pipes/zod-validation-pipe";
import {PrismaService} from "src/prisma/prisma.service";
import {z} from "zod";

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('0')
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num), {
        message: "Page must be a number."
    });


const pageValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer < typeof pageQueryParamSchema > ;

@Controller('/destino')
// @UseGuards(JwtAuthGuard)
export class TableDestinoController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle(@Query('page', pageValidationPipe) page: PageQueryParamSchema) {
        const perPage = 5; // Quantidade de registros por página

        // Contar o total de registros na tabela origem
        const totalOrigens = await this.prisma.destino.count();

        const destinos = await this.prisma.destino.findMany({
            take: perPage,
            skip: page * perPage, // Remove o -1 para começar do índice 0
            orderBy: {
                id: 'asc',
            },
            select: {
                id: true,
                descricao: true,
                aereporto: true
            },
        });

        const totalPages = Math.ceil(totalOrigens / perPage);

        return [{
            page,
            perPage,
            totalPages,
            totalOrigens,
            destinos,
        }];
    }
}