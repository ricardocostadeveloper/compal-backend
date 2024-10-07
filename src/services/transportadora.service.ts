import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransportadoraService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar o produto pelo partNumber
  async getTransportadoraByPartNumber(descricao: string) {
    // console.log('Valor da descricao recebido:', descricao); // Adiciona este log
    
    const result = await this.prisma.transportadora.findFirst({
      where: {
        descricao: {
          equals: descricao,
          mode: 'insensitive',  // Ignora a sensibilidade de caixa
        },
      },
    });
  
    // console.log('Resultado da consulta:', result); // E este log para ver o retorno
    return result;
  }
}
