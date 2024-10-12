import {
    Controller,
    Post,
    Body,
    BadRequestException,
    InternalServerErrorException
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const criarValorBidBodySchema = z.object({
    bidId: z.string(),
    seguroTransportadora: z.object({
        descricao: z.string(),
        percentual: z.string()
    }).optional(),
    outros: z.object({
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
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(@Body(bodyValidationPipe) body: CriarValorBidBodySchema) {
        const { bidId, seguroTransportadora, seguroCompal, frete, outros } = body;
        
        // Verifica se o BID existe
        const bidExists = await this.prisma.bid.findUnique({
            where: { id: bidId },
        });
        if (!bidExists) {
            throw new BadRequestException('BID não encontrado.');
        }
        const bid = bidExists.id;

        // Começa uma transação
        const transaction = await this.prisma.$transaction(async (tx) => {
            // Insere dados em SeguroTransportadora, se disponíveis
            if (seguroTransportadora) {
                await tx.seguroTransportadora.create({
                    data: {
                        descricao: seguroTransportadora.descricao,
                        valor: seguroTransportadora.percentual,
                        bidId: bid,
                    }
                });
            }

            // Verifica se já existe um registro em 'outros' com a mesma descrição
            if (outros) {
                console.log(outros)
                const outrosExists = await tx.outros.findFirst({
                    where: { descricao: outros.descricao,  bidId: bidId },
                });

                if (outrosExists) {
                    // Atualiza o registro existente em 'outros'
                    await tx.outros.update({
                        where: { id: outrosExists.id },
                        data: {
                            valor: outros.percentual,
                        },
                    });
                } else {
                    // Insere um novo registro em 'outros'
                    await tx.outros.create({
                        data: {
                            descricao: outros.descricao,
                            valor: outros.percentual,
                            bidId: bid,
                        }
                    });
                }
            }

            // Insere dados em ValorGeralDrr, se disponíveis
            if (seguroCompal) {
                await tx.valorGeralDrr.create({
                    data: {
                        descricao: seguroCompal.descricao,
                        valor: seguroCompal.percentual,
                        bidId: bid,
                    }
                });
            }

            // Verifica se já existe um registro em 'fretes' com a mesma descrição
            if (frete) {
                const fretesExists = await tx.fretes.findFirst({
                    where: { descricao: frete.operacao, bidId: bidId},
                });

                if (fretesExists) {
                    // Atualiza o registro existente em 'fretes'
                    await tx.fretes.update({
                        where: { id: fretesExists.id },
                        data: {
                            valorMinimo: frete.fretePesoMinimo,
                            valorKg: frete.fretePesoMaximo,
                        },
                    });
                } else {
                    // Insere um novo registro em 'fretes'
                    await tx.fretes.create({
                        data: {
                            descricao: frete.operacao,
                            valorMinimo: frete.fretePesoMinimo,
                            valorKg: frete.fretePesoMaximo,
                            bidId: bid,
                        }
                    });
                }
            }
        }).catch(err => {
            // Lidar com erro da transação
            throw new InternalServerErrorException('Erro ao salvar os dados.');
        });

        return {
            message: 'Dados associados ao BID criados ou atualizados com sucesso.',
            transaction
        };
    }
}
