import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/sales')
@ApiTags('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('/calculateSales')
  @ApiOperation({ summary: 'calculate sales' })
  @ApiResponse({
    description: 'calculate total sales',
  })
  async calculateSales(): Promise<unknown> {
    return this.salesService.calculateSales();
  }

  @Get('/calculateSalesSummary')
  @ApiOperation({ summary: 'calculate sales summary' })
  @ApiResponse({
    description: 'calculate total sales summary',
  })
  async calculateSalesSummary(): Promise<unknown> {
    return this.salesService.calculateSalesSummary();
  }
}
