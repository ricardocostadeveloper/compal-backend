import { Controller, Get, Param } from '@nestjs/common';
import { TransportadoraService } from 'src/services/transportadora.service';

@Controller('transportadoraId')
export class TransportadoraController {
  constructor(private produtoService: TransportadoraService) {}

  // Endpoint para buscar produto pelo partNumber
  @Get(':descricao')
  async getTransportadora(@Param('descricao') descricao: string) {
    const produto = await this.produtoService.getTransportadoraByPartNumber(descricao);
    
    if (!produto) {
      return { message: 'Produto não encontrado' };
    }

    return produto;
  }
}
