import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SalesService {
  // constructor(private salesRepository: CurrencyRepository) {}
  private discounts = JSON.parse(
    fs.readFileSync('path/to/discounts.json', 'utf8'),
  );
  private orders = JSON.parse(fs.readFileSync('path/to/orders.json', 'utf8'));
  private products = JSON.parse(
    fs.readFileSync('path/to/products.json', 'utf8'),
  );

}
