import {
    Controller,
    Post,
    UseGuards,
    Body,
    BadRequestException
} from "@nestjs/common";
import {
    JwtAuthGuard
} from "src/auth/jwt-auth.guard";
import {
    CurrentUser
} from "src/auth/current-user-decorator";
import {
    UserPayLoad
} from "src/auth/jwt.strategy";
import {
    z
} from "zod";
import {
    ZodValidationPipe
} from "src/pipes/zod-validation-pipe";
import {
    PrismaService
} from "src/prisma/prisma.service";

// Validação agora espera descrições ao invés de IDs
const criarBidBodySchema = z.object({
    modal: z.string(),
    origem: z.string(), // Descrição da origem
    destino: z.string(), // Descrição do destino
    transportadora: z.string(), // Descrição da transportadora
})

const bodyValidationPipe = new ZodValidationPipe(criarBidBodySchema);

type CriarBidBodySchema = z.infer < typeof criarBidBodySchema > ;

@Controller('/criarbid')
// @UseGuards(JwtAuthGuard)
export class CriarBidController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarBidBodySchema,
        @CurrentUser() user: UserPayLoad
    ) {
        const {
            modal,
            origem,
            destino,
            transportadora
        } = body;
        const autorId = "a48abd8f-eeaa-4802-af1b-6e22e7b620d1";

        // Verifica se origem existe pela descrição e obtém o id
        const origemBid = await this.prisma.origem.findFirst({
            where: {
                descricao: origem
            }, // Usamos findFirst para buscar pela descrição
        });
        if (!origemBid) {
            throw new BadRequestException('Origem não encontrada.');
        }

        // Garantimos que 'origem' é um objeto antes de acessar 'id'
        const origemId = origemBid.id; // Acessa a propriedade 'id' do objeto origem
        const tipoModal = modal; // Acessa a propriedade 'id' do objeto origem

        // Verifica se destino existe pela descrição e obtém o id
        const destinoBid = await this.prisma.destino.findFirst({
            where: {
                descricao: destino
            },
        });
        if (!destinoBid) {
            throw new BadRequestException('Destino não encontrada.');
        }

        // Garantimos que 'destino' é um objeto antes de acessar 'id'
        const destinoId = destinoBid.id; // Acessa a propriedade 'id' do objeto destino

        // Verifica se transportadora existe pela descrição e obtém o id
        const transportadoraBid = await this.prisma.transportadora.findFirst({
            where: {
                descricao: transportadora
            },
        });
        if (!transportadoraBid) {
            throw new BadRequestException('Transportadora não encontrada.');
        }

        // Garantimos que 'transportadora' é um objeto antes de acessar 'id'
        const transportadoraId = transportadoraBid.id; // Acessa a propriedade 'id' do objeto transportadora

        // Cria o BID com os ids correspondentes
        await this.prisma.bid.create({
            data: {
                autorId,
                tipoModal,
                origemId, // Usa o id da origem encontrada
                destinoId, // Usa o id do destino encontrado
                transportadoraId, // Usa o id da transportadora encontrada
            }
        });

        return {
            message: 'BID criado com sucesso.'
        };

    }
}