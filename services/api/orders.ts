import { CreateOrderData, OrderItem } from "@/types/orders";
import { getStrapiURL } from "@/lib/utils";

export async function createOrder(
  orderData: CreateOrderData
): Promise<OrderItem> {
  try {
    const strapiData = {
      data: {
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        orderItems: orderData.orderItems,
        condition: "pending",
        shippingAddress: orderData.shippingAddress,
        totalAmount: orderData.totalAmount,
        paymentMethod: orderData.paymentMethod,
        statusDelivery: "pending",
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
