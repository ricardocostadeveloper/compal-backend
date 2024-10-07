import { Controller, Get, Param } from '@nestjs/common';
import { BidService } from 'src/services/bid.service';

@Controller('bid')
export class BidController {
  constructor(private bidService: BidService) {}

  // Endpoint para buscar bid pelo partNumber
  @Get(':id')
  async getBid(@Param('id') id: string) {
    const bid = await this.bidService.getBidByPartNumber(id);

    if (!bid) {
      return { message: 'Produto não encontrado' };
    }

    return bid;
  }
}
