import { Controller, Get, Param } from '@nestjs/common';
import { FreteService } from 'src/services/frete.service';

@Controller('freteId')
export class FreteController {
  constructor(private freteService: FreteService) {}

  // Endpoint para buscar produto pelo partNumber
  @Get(':descricao')
  async getTransportadora(@Param('descricao') descricao: string) {
    const produto = await this.freteService.getfreteByPartNumber(descricao);

    if (!produto) {
      return { message: 'Produto não encontrado' };
    }

    return produto;
  }
}
