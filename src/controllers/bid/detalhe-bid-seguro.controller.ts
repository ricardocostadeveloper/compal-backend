import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('segurosbid')
export class SegurosBidController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':bidId')
  async getDetalhesByBidId(@Param('bidId') bidId: string) {
    const segurosTransportadora = await this.prisma.seguroTransportadora.findMany({
      where: {
        bidId,
      },
      select:{
        id:true,
        descricao:true,
        valor:true
      }
    });

    const outros = await this.prisma.outros.findMany({
      where: {
        bidId,
      },
      select:{
        id:true,
        descricao:true,
        valor:true
      }
    });

    const segurosCompal = await this.prisma.valorGeralDrr.findMany({
      where: {
        bidId,
      },
      select:{
        id:true,
        descricao:true,
        valor:true
      }
    });

    const fretes = await this.prisma.fretes.findMany({
      where: {
        bidId,
      },
      select:{
        id:true,
        descricao:true,
        valorMinimo:true,
        valorKg: true
      }
    });
    var status
    if (fretes == null || segurosCompal == null || segurosTransportadora == null || outros == null){
      status = 1;
    }else{
      status = 2;
    }
    return {
      segurosTransportadora,
      outros,
      segurosCompal,
      fretes,
      status,
    };
  }
}
