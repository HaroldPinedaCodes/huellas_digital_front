// services/orders.ts
import { CreateOrderData, OrderItem } from "@/types/orders";
import { getStrapiURL } from "@/lib/utils";
// import { User } from "lucide-react";

// const STRAPI_URL =
//   process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";

// Función auxiliar para generar número de orden
// function generateOrderNumber(): string {
//   const prefix = "ORD";
//   const timestamp = Date.now();
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `${prefix}-${timestamp}-${random}`;
// }

export async function createOrder(
  orderData: CreateOrderData
): Promise<OrderItem> {
  try {
    // Generar documentId único
    // const documentId = generateDocumentId();

    const strapiData = {
      data: {
        // documentId,
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        condition: "pending",
        shippingAddress: orderData.shippingAddress,
        totalAmount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod,
        statusDelivery: "pending",
        // El resto de campos (createdAt, updatedAt, publishedAt) los maneja Strapi
      },
    };

    console.log("Sending to Strapi:", strapiData); // Debug

    const response = await fetch(getStrapiURL("/api/orders"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strapiData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Strapi error:", error);
      throw new Error(error.error?.message || "Error creating order");
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
}

// Función auxiliar para generar documentId
// function generateDocumentId(): string {
//   return Array(25)
//     .fill(0)
//     .map(() => Math.random().toString(36).charAt(2))
//     .join("");
// }

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
