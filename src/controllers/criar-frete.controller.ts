import {Controller, Post, UseGuards, Body, BadRequestException} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarFreteBodySchema = z.object({
    descricao: z.string(),
    valorMinimo: z.string(),
    valorKg: z.string(),
    bidId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(criarFreteBodySchema)

type CriarFreteBodySchema = z.infer<typeof criarFreteBodySchema>


@Controller('/fretes')
// @UseGuards(JwtAuthGuard)

export class CriarFreteController{
    constructor(
        private prisma: PrismaService
    ){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarFreteBodySchema,
        // @CurrentUser() user: UserPayLoad
    ){
        const { descricao, valorMinimo, valorKg, bidId} = body
        // const autorId = user.sub
        // Verifica se bid existe
        const bidExists = await this.prisma.bid.findUnique({
            where: { id: bidId },
        });

        if (!bidExists) {
            throw new BadRequestException('Bid não encontrado.');
        }
        await this.prisma.fretes.create({
            data: {
                descricao,
                valorMinimo,
                valorKg,
                bidId
            }
        })

        return { message: 'Frete criado com sucesso.' }
    }
}