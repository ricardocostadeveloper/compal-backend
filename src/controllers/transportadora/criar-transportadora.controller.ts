import {Controller, Post, UseGuards, Req, Body } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayLoad } from "src/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarTransportadoraBodySchema = z.object({
    descricao: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(criarTransportadoraBodySchema)

type CriarTransportadoraBodySchema = z.infer<typeof criarTransportadoraBodySchema>


@Controller('/transportadora')
// @UseGuards(JwtAuthGuard)

export class CriarTransportadoraController{
    constructor(
        private prisma: PrismaService
    ){}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarTransportadoraBodySchema,
        @CurrentUser() user: UserPayLoad
    ){
        const { descricao } = body
        
        const autorId = "75bd889b-c197-48c9-94b8-48971476616c";


        await this.prisma.transportadora.create({
            data: {
                autorId: autorId,
                descricao,
            }
        })

        return { message: 'Transportadora criada com sucesso.' }

    }
}