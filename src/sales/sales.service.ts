import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Discount, Order, Product } from './model/sale.interface';
import path from 'path';
import * as discounts from './discounts.json';
import * as orders from './orders.json';
import * as products from './products.json';

@Injectable()
export class SalesService {
  async calculateSales(): Promise<{
    totalSalesBeforeDiscount: number;
    totalSalesAfterDiscount: number;
    totalDiscountAmount: number;
    averageDiscountPercentage: number;
  }> {
    let totalSalesBeforeDiscount = 0;
    let totalSalesAfterDiscount = 0;
    let totalDiscountAmount = 0;
    let discountCount = 0;

    orders.forEach((order) => {
      let orderTotalBeforeDiscount = 0;
      let orderTotalAfterDiscount = 0;

      order.items.forEach((item) => {
        const product = products.find((p) => p.sku === item.sku);

        if (product) {
          const itemTotalBeforeDiscount = item.quantity * product.price;
          orderTotalBeforeDiscount += itemTotalBeforeDiscount;

          let discount = 0;
          if (order.discount) {
            discount = this.calculateDiscount(
              itemTotalBeforeDiscount,
              order.discount,
            );
          }

          const itemTotalAfterDiscount = itemTotalBeforeDiscount - discount;
          orderTotalAfterDiscount += itemTotalAfterDiscount;

          totalDiscountAmount += discount;
          discountCount++;
        }
      });

      totalSalesBeforeDiscount += orderTotalBeforeDiscount;
      totalSalesAfterDiscount += orderTotalAfterDiscount;
    });

    const averageDiscountPercentage = discountCount
      ? (totalDiscountAmount / totalSalesBeforeDiscount) * 100
      : 0;

    return {
      totalSalesBeforeDiscount,
      totalSalesAfterDiscount,
      totalDiscountAmount,
      averageDiscountPercentage,
    };
  }

  calculateDiscount(amount: number, discountCode: string) {
    const discountInfo = discounts.find((d) => d.key === discountCode);

    if (discountInfo) {
      return discountInfo.value * amount;
    }

    return 0;
  }
}
