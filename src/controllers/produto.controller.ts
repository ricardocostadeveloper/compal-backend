import { Controller, Get, Param } from '@nestjs/common';
import { ProdutoService } from 'src/services/produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  // Endpoint para buscar produto pelo partNumber
  @Get(':partNumber')
  async getProduto(@Param('partNumber') partNumber: string) {
    const produto = await this.produtoService.getProdutoByPartNumber(partNumber);

    if (!produto) {
      return { message: 'Produto não encontrado' };
    }

    return produto;
  }
}
