import {Controller, Post, UseGuards, Body, BadRequestException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarOutrosBodySchema = z.object({
    descricao: z.string(),
    valor: z.string(),
    bidId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(criarOutrosBodySchema)

type CriarOutrosBodySchema = z.infer<typeof criarOutrosBodySchema>


@Controller('/outros')
@UseGuards(JwtAuthGuard)

export class CriarOutrosController{
    constructor(
        private prisma: PrismaService
    ){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarOutrosBodySchema,
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
        await this.prisma.outros.create({
            data: {
                descricao,
                valor,
                bidId,
            }
        })

        return { message: 'Outros criado com sucesso.' }
    }
}