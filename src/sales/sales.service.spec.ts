import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesService],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateDiscount', () => {
    it('should calculate discount correctly', () => {
      const amount = 100;
      const discountCode = 'SALE10';

      const result = service.calculateDiscount(amount, discountCode);

      expect(result).toEqual(10);
    });

    it('should return 0 for unknown discount code', () => {
      const amount = 100;
      const discountCode = 'UNKNOWN';

      const result = service.calculateDiscount(amount, discountCode);

      expect(result).toEqual(0);
    });
  });

  describe('calculateSales', () => {
    it('should calculate sales correctly', async () => {
      const orders = [
        {
          orderId: 1,
          discount: 'SALE10',
          items: [
            {
              sku: 1001,
              quantity: 3,
            },
            {
              sku: 1004,
              quantity: 1,
            },
          ],
        },
        {
          orderId: 2,
          items: [
            {
              sku: 1003,
              quantity: 1,
            },
          ],
        },
        {
          orderId: 3,
          discount: 'SALE30',
          items: [
            {
              sku: 1003,
              quantity: 1,
            },
            {
              sku: 1001,
              quantity: 4,
            },
            {
              sku: 1002,
              quantity: 2,
            },
          ],
        },
        {
          orderId: 4,
          discount: 'SALE10',
          items: [
            {
              sku: 1001,
              quantity: 7,
            },
          ],
        },
        {
          orderId: 5,
          discount: 'SALE20',
          items: [
            {
              sku: 1003,
              quantity: 1,
            },
          ],
        },
      ];

      const products = [
        {
          sku: 1001,
          price: 14.99,
        },
        {
          sku: 1002,
          price: 156.99,
        },
        {
          sku: 1003,
          price: 1099.99,
        },
        {
          sku: 1004,
          price: 64.99,
        },
      ];

      const result = await service.calculateSales();

      expect(result.totalSalesBeforeDiscount).toEqual(3888.8);
      expect(result.totalSalesAfterDiscount).toEqual(3205.134);
      expect(result.totalDiscountAmount).toEqual(683.666);
      expect(result.averageDiscountPercentage).toEqual(17.580384694507302);
    });
  });
});
