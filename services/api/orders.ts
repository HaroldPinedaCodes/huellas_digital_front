// services/orders.ts
import { CreateOrderData, OrderItem } from "@/types/orders";
import { getStrapiURL } from "@/lib/utils";
// import { User } from "lucide-react";

export async function createOrder(
  orderData: CreateOrderData
): Promise<OrderItem> {
  try {
    // Adaptamos los datos para que coincidan exactamente con los campos de Strapi
    const strapiOrderData = {
      orderNumber: generateOrderNumber(),
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      totalAmount: orderData.totalAmount,
      statusPayment: orderData.condition, // Cambio a statusPayment
      paymentMethod: orderData.paymentMethod,
      statusDelivery: orderData.statusDelivery, // Cambio a statusDelivery
      // Si el usuario está autenticado, incluimos la relación
      ...(orderData.user && { user: orderData.user }),
    };

    console.log("Sending to Strapi:", strapiOrderData); // Para debugging

    const response = await fetch(`${getStrapiURL("/api/orders")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: strapiOrderData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Strapi error details:", error);
      throw new Error(error.error?.message || "Error creating order");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
}

// Función auxiliar para generar número de orden
function generateOrderNumber(): string {
  const prefix = "ORD";
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

// Función para obtener órdenes de un usuario
export async function getUserOrders(userId: number): Promise<OrderItem[]> {
  try {
    const response = await fetch(
      `${getStrapiURL(
        "/api/orders"
      )}?filters[userId]=${userId}&sort=createdAt:desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching orders");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    throw error;
  }
}

// Función para obtener una orden específica
export async function getOrder(orderId: number): Promise<OrderItem> {
  try {
    const response = await fetch(`${getStrapiURL(`/api/orders/${orderId}`)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching order");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in getOrder:", error);
    throw error;
  }
}

// Función para actualizar el estado de una orden
export async function updateOrderStatus(
  orderId: number,
  status: ["status"]
): Promise<OrderItem> {
  try {
    const response = await fetch(`${getStrapiURL(`/api/orders/${orderId}`)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          status,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating order");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    throw error;
  }
}
