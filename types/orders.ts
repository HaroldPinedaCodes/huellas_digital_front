// types/order.ts

// Interface para los items que se guardan en el campo JSON
export interface OrderItemJSON {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image: {
      url: string;
    };
    priceClient: number;
  };
  quantity: number;
  price: number;
}

// Interface para los orderItems que son componentes en Strapi
export interface OrderItemComponent {
  product: number; // Solo el ID del producto para la relación
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

export type StatusDivery =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderItemInput {
  product: number; // Solo el ID del producto
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  orderNumber: string;
  items: OrderItem[]; // Mantén el tipo existente para el JSON
  orderItems: OrderItemInput[]; // Nuevo tipo para los orderItems
  condition: OrderCondition;
  shippingAddress: ShippingAddress;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  statusDelivery: StatusDivery;
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

export interface Order extends Omit<CreateOrderData, "orderItems"> {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  orderItems: {
    id: number;
    product: {
      data: {
        id: number;
        attributes: {
          name: string;
          image: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          priceVet: number;
          priceClient: number;
        };
      };
    };
    quantity: number;
    price: number;
  }[];
}
