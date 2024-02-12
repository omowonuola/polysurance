import { Injectable } from '@nestjs/common';
import * as discounts1 from './discounts1.json';
import * as orders1 from './orders1.json';
import * as products1 from './products1.json';

import * as discounts2 from './discounts2.json';
import * as orders2 from './orders2.json';
import * as products2 from './products2.json';

@Injectable()
export class SalesService {
  async calculateSales(): Promise<{
    totalSalesBeforeDiscount: number;
    totalSalesAfterDiscount: number;
    totalDiscountAmount: number;
    averageDiscountPerCustomer: number;
  }> {
    let totalSalesBeforeDiscount = 0;
    let totalSalesAfterDiscount = 0;
    let totalDiscountAmount = 0;
    let totalCustomersWithDiscount = 0;

    orders1.forEach((order) => {
      let orderTotalBeforeDiscount = 0;
      let orderTotalAfterDiscount = 0;
      let hasDiscount = false;

      order.items.forEach((item) => {
        const product = products1.find((p) => p.sku === item.sku);

        if (product) {
          const itemTotalBeforeDiscount = item.quantity * product.price;
          orderTotalBeforeDiscount += itemTotalBeforeDiscount;

          let discount = 0;
          if (order.discount) {
            discount = this.calculateDiscount(
              itemTotalBeforeDiscount,
              order.discount,
            );

            if (discount > 0) {
              hasDiscount = true;
            }
          }

          const itemTotalAfterDiscount = itemTotalBeforeDiscount - discount;
          orderTotalAfterDiscount += itemTotalAfterDiscount;

          totalDiscountAmount += discount;
        }
      });

      totalSalesBeforeDiscount += orderTotalBeforeDiscount;
      totalSalesAfterDiscount += orderTotalAfterDiscount;

      if (hasDiscount) {
        totalCustomersWithDiscount++;
      }
    });

    const averageDiscountPerCustomer =
      totalCustomersWithDiscount === 0
        ? 0
        : (totalDiscountAmount / totalCustomersWithDiscount) * 100;

    return {
      totalSalesBeforeDiscount,
      totalSalesAfterDiscount,
      totalDiscountAmount,
      averageDiscountPerCustomer,
    };
  }

  calculateDiscount(amount: number, discountCode: string) {
    const discountInfo = discounts1.find((d) => d.key === discountCode);

    if (discountInfo) {
      return discountInfo.value * amount;
    }

    return 0;
  }

  async calculateSalesSummary(): Promise<{
    totalSalesBeforeDiscount: number;
    totalSalesAfterDiscount: number;
    totalDiscountAmount: number;
    averageDiscountPerCustomer: number;
  }> {
    let totalSalesBeforeDiscount = 0;
    let totalSalesAfterDiscount = 0;
    let totalDiscountAmount = 0;
    let totalCustomersWithDiscount = 0;
    let totalCustomers = 0;
    for (const order of orders2) {
      totalCustomers++;

      let orderTotal = 0;

      for (const item of order.items) {
        const product = products2.find((p) => p.sku === item.sku);

        if (product) {
          orderTotal += product.price * item.quantity;
        }
      }

      totalSalesBeforeDiscount += orderTotal;

      const appliedDiscounts = order.discount ? order.discount.split(',') : [];
      let orderDiscount = 0;

      if (appliedDiscounts.length > 0) {
        totalCustomersWithDiscount++;
      }

      for (const discountKey of appliedDiscounts) {
        const appliedDiscount = discounts2.find((d) => d.key === discountKey);

        if (appliedDiscount) {
          orderDiscount += appliedDiscount.value;
        }
      }

      totalSalesAfterDiscount += orderTotal - orderTotal * orderDiscount;
      totalDiscountAmount += orderTotal * orderDiscount;
    }

    const averageDiscountPerCustomer =
      totalCustomersWithDiscount === 0
        ? 0
        : (totalDiscountAmount / totalCustomersWithDiscount) * 100;

    return {
      totalSalesBeforeDiscount,
      totalSalesAfterDiscount,
      totalDiscountAmount,
      averageDiscountPerCustomer,
    };
  }
}
