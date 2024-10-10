import {
    Controller,
    Post,
    Body,
    BadRequestException,
    InternalServerErrorException
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/valorbid')
export class CriarValorBidController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(@Body() body: any) { // Alterado para 'any' para desabilitar a validação
        console.log('Dados recebidos no backend:', body); // Aqui você pode ver o corpo da requisição

        // Apenas para depuração, você pode retornar os dados recebidos
        return {
            message: 'Dados recebidos com sucesso.',
            dadosRecebidos: body
        };
    }
}
