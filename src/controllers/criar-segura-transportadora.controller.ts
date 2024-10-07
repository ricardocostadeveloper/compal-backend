import {Controller, Post, UseGuards, Body, BadRequestException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarSeguroTransportadoraBodySchema = z.object({
    descricao: z.string(),
    valor: z.string(),
    bidId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(criarSeguroTransportadoraBodySchema)

type CriarSeguroTransportadoraBodySchema = z.infer<typeof criarSeguroTransportadoraBodySchema>


@Controller('/segurotransportadora')
@UseGuards(JwtAuthGuard)

export class CriarSeguroTransportadoraController{
    constructor(
        private prisma: PrismaService
    ){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarSeguroTransportadoraBodySchema,
        // @CurrentUser() user: UserPayLoad
    ){
        const { descricao,valor, bidId } = body
        // const autorId = user.sub

         // Verifica se bid existe
         const bidExists = await this.prisma.bid.findUnique({
            where: { id: bidId },
        });
        if (!bidExists) {
            throw new BadRequestException('Bid não encontrado.');
        }
        await this.prisma.seguroTransportadora.create({
            data: {
                descricao,
                valor,
                bidId,
            }
        })

        return { message: 'Seguro Transportadora criada com sucesso.' }
    }
}