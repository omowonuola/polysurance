export interface Product {
  sku: number;
  price: number;
}

export interface OrderItem {
  sku: number;
  quantity: number;
}

export interface Order {
  orderId: number;
  discount?: string;
  items: OrderItem[];
}

export interface Discount {
  key: string;
  value: number;
}
