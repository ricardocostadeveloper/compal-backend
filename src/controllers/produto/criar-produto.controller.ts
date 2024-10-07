import {Controller, Post, UseGuards, Body, BadRequestException  } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayLoad } from "src/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarProdutosBodySchema = z.object({
    partNumber: z.string(),
    dimensaoCaixa: z.string(),
    standard: z.string(),
    upper: z.string(),
    lower: z.string(),
    quantidadeMax: z.string(),

})

const bodyValidationPipe = new ZodValidationPipe(criarProdutosBodySchema)

type CriarProdutosBodySchema = z.infer<typeof criarProdutosBodySchema>


@Controller('/produto')
// @UseGuards(JwtAuthGuard) 

export class CriarProdutosController{
    constructor(
        private prisma: PrismaService
    ){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarProdutosBodySchema,
        @CurrentUser() user: UserPayLoad
    ){
        const { partNumber, standard, upper, lower, quantidadeMax,dimensaoCaixa } = body
        const autorId = "a48abd8f-eeaa-4802-af1b-6e22e7b620d1";


      

        // Cria o Produtos
        await this.prisma.produtos.create({
            data: {
                autorId,
                partNumber,
                dimensaoCaixa,
                standard,
                upper,
                lower,
                quantidadeMax
            }
        })

        return { message: 'Produto criado com sucesso.' }
    }
}  