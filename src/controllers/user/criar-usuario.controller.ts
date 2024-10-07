import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

const criarUsuarioBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string(),
    tipo: z.string(),
})

type CriarUsuarioBodySchema = z.infer<typeof criarUsuarioBodySchema>

// rota de crição de usuario
@Controller('/usuario')
export class CriarUsuarioController{
    constructor(private prisma: PrismaService){}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(criarUsuarioBodySchema))
    async handle(@Body() body: CriarUsuarioBodySchema){
        
        // captura da requisicao os valores passados
        const {nome, email, password, tipo} = body
        
        const userWithSameEmail = await this.prisma.user.findUnique({
            where:{
                email,
            }
        })
        // retorna o erro caso o email já exista na base
        if (userWithSameEmail) {
            throw new ConflictException(
                'Email já cadastrado!'
            )
        }
        // gera a hash encima do password
        const hashedPassword = await hash(password, 8)

        // insere os valores na tabela usuario
        await this.prisma.user.create({
            data: {
                nome,
                email,
                password: hashedPassword,
                tipo,
            }
        })
    }
}