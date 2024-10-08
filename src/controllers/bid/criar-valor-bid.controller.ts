import {
    Controller,
    Post,
    Body,
    BadRequestException,
    InternalServerErrorException
} from "@nestjs/common";
import {
    z
} from "zod";
import {
    ZodValidationPipe
} from "src/pipes/zod-validation-pipe";
import {
    PrismaService
} from "src/prisma/prisma.service";

const criarValorBidBodySchema = z.object({
    // bidId: z.string(),
    seguroTransportadora: z.object({
        descricao: z.string(),
        percentual: z.string()
    }).optional(),
    seguroCompal: z.object({
        descricao: z.string(),
        percentual: z.string()
    }).optional(),
    frete: z.object({
        operacao: z.string(),
        fretePesoMinimo: z.string(),
        fretePesoMaximo: z.string()
    }).optional(),
});


const bodyValidationPipe = new ZodValidationPipe(criarValorBidBodySchema);

type CriarValorBidBodySchema = z.infer<typeof criarValorBidBodySchema>;

@Controller('/valorbid')
// @UseGuards(JwtAuthGuard)
export class CriarValorBidController {
    constructor(
        private prisma: PrismaService
    ) {}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CriarValorBidBodySchema
    ) {
        const {
            seguroTransportadora,
            seguroCompal,
            frete
        } = body;
const bidId = "14b1bb4b-e5ca-4868-81cf-efa2912c7f7b"
        // Verifica se o BID existe
        const bidExists = await this.prisma.bid.findUnique({
            where: { id: bidId },
        });
        if (!bidExists) {
            throw new BadRequestException('BID não encontrado.');
        }

        // Começa uma transação
        const transaction = await this.prisma.$transaction(async (tx) => {
            // Insere dados em SeguroTransportadora, se disponíveis
            if (seguroTransportadora) {
                await tx.seguroTransportadora.create({
                    data: {
                        descricao: seguroTransportadora.descricao,
                        valor: seguroTransportadora.percentual,
                        bidId: bidId,
                    }
                });
            }

            // Insere dados em ValorGeralDrr, se disponíveis
            if (seguroCompal) {
                await tx.valorGeralDrr.create({
                    data: {
                        descricao: seguroCompal.descricao,
                        valor: seguroCompal.percentual,
                        bidId: bidId,
                    }
                });
            }

            // Insere dados em Fretes, se disponíveis
            if (frete) {
                await tx.fretes.create({
                    data: {
                        descricao: frete.operacao,
                        valorMinimo: frete.fretePesoMinimo,
                        valorKg: frete.fretePesoMaximo,
                        bidId: bidId,
                    }
                });
            }
        }).catch(err => {
            // Lidar com erro da transação
            throw new InternalServerErrorException('Erro ao salvar os dados.');
        });

        return {
            message: 'Dados associados ao BID criados com sucesso.',
            transaction
        };
    }
}
