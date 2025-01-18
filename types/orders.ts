// types/order.ts
export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export type OrderCondition =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentMethod = "card" | "pse" | "cash"; // Exactamente como está en Strapi

export interface CreateOrderData {
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  condition: OrderCondition;
  paymentMethod: PaymentMethod;
  statusDelivery:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  user?: number;
}
