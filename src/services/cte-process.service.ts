import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CteProcessService {
  constructor(private prisma: PrismaService) {}

  async processarDados(cteArquivo, emitenteArquivo, remetenteArquivo, destinatarioArquivo, impostoArquivo, nfe) {
    // Aqui você pode processar ou enviar os dados para o outro controlador ou serviço
    // Supondo que o outro controlador aceite esses dados
    const dadosProcessados = {
      cteArquivo,
      emitenteArquivo,
      remetenteArquivo,
      destinatarioArquivo,
      impostoArquivo,
      nfe
    };

    // Aqui você pode chamar outro serviço ou retornar os dados para serem usados no controlador chamado
    return dadosProcessados;
  }
}
