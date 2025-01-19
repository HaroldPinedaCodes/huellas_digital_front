// types/order.ts
export interface OrderItem {
  id: number;
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

export type PaymentMethod = "card" | "pse" | "cash";

export type OrderCondition =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";
export type StatusDelivery =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CreateOrderData {
  // documentId: string;
  orderNumber: string;
  items: OrderItem[];
  condition: OrderCondition;
  shippingAddress: ShippingAddress;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  statusDelivery: StatusDelivery;
}

export interface CardDetails {
  number?: string;
  expiry?: string;
  cvc?: string;
}

export interface PaymentInfo {
  paymentMethod: PaymentMethod;
  cardDetails?: CardDetails;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order extends CreateOrderData {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
