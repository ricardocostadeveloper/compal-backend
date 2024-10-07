import { Controller, Get, Param } from '@nestjs/common';
import { DestinoService } from 'src/services/destino.service';

@Controller('destinoId')
export class DestinoController {
  constructor(private produtoService: DestinoService) {}

  // Endpoint para buscar produto pelo partNumber
  @Get(':aereporto')
  async getDestino(@Param('aereporto') aereporto: string) {
    const produto = await this.produtoService.getDestinoByPartNumber(aereporto);

    if (!produto) {
      return { message: 'Produto não encontrado' };
    }

    return produto;
  }
}
