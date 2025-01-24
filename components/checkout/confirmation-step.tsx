"use client";

import { useState } from "react";
import { useCart } from "@/store";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { createOrder } from "@/services/api/orders";
import { CreateOrderData, PaymentMethod } from "@/types/orders";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

interface ConfirmationStepProps {
  onComplete: () => void;
}

export function ConfirmationStep({ onComplete }: ConfirmationStepProps) {
  const {
    items,
    deliveryInfo,
    paymentInfo,
    getTotalPrice,
    clearCart,
    clearCheckout,
  } = useCart();

  // const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const getPaymentMethodText = (method: PaymentMethod): string => {
    const paymentMethods: Record<PaymentMethod, string> = {
      card: "Tarjeta de Crédito",
      pse: "PSE",
      cash: "Efectivo",
    };
    return paymentMethods[method] || method;
  };

  const generateOrderNumber = (): string => {
    const prefix = "ORD";
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleCreateOrder = async (): Promise<void> => {
    if (!deliveryInfo || !paymentInfo) {
      toast.error("Información incompleta");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData: CreateOrderData = {
        orderNumber: generateOrderNumber(),
        // Guardamos la información completa del producto en el campo items (JSON)
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,

          price: item.product.priceClient,
        })),
        // En orderItems solo enviamos la relación con el ID del producto
        orderItems: items.map((item) => ({
          product: item.product.id, // Solo el ID
          quantity: item.quantity,
          price: item.product.priceClient,
        })),
        shippingAddress: {
          street: deliveryInfo.address,
          city: deliveryInfo.city,
          state: deliveryInfo.state,
          zipCode: deliveryInfo.zipCode,
        },
        totalAmount: getTotalPrice(),
        condition: "pending",
        paymentMethod: paymentInfo.paymentMethod,
        statusDelivery: "pending",
      };

      const order = await createOrder(orderData);
      console.log("Orden creada:", order); // Para verificar la respuesta

      toast.success("Orden creada exitosamente");
      clearCart();
      clearCheckout();
      onComplete();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error al crear la orden");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 mt-8">
        <h3 className="text-lg font-medium">Resumen del pedido</h3>
        <p className="text-sm text-muted-foreground">
          Por favor revisa los detalles de tu pedido antes de confirmar.
        </p>
      </div>

      {/* Detalles de envío */}
      <Card className="p-6">
        <h4 className="font-medium mb-2">Información de envío</h4>
        {deliveryInfo && (
          <div className="space-y-2 text-sm">
            <p>{deliveryInfo.address}</p>
            <p>
              {deliveryInfo.city}, {deliveryInfo.state}
            </p>
            <p>{deliveryInfo.zipCode}</p>
            <p>Teléfono: {deliveryInfo.phone}</p>
            <p>Email: {deliveryInfo.email}</p>
          </div>
        )}
      </Card>

      {/* Detalles de pago */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Información de pago</h4>
        {paymentInfo ? (
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Método de pago:</p>
            <p>{getPaymentMethodText(paymentInfo.paymentMethod)}</p>
            {paymentInfo.paymentMethod === "card" && paymentInfo.cardNumber && (
              <>
                <p className="text-muted-foreground mt-2">
                  Detalles de la tarjeta:
                </p>
                <p>Número: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                {paymentInfo.cardExpiry && (
                  <p>Fecha de vencimiento: {paymentInfo.cardExpiry}</p>
                )}
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No se ha seleccionado método de pago
          </p>
        )}
      </Card>

      {/* Resumen de productos */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Productos</h4>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <div className="flex gap-2">
                <span>{item.quantity}x</span>
                <span>{item.product.name}</span>
              </div>
              <span className="font-medium">
                ${(item.product.priceClient * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleCreateOrder}
        className="w-full"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando orden...
          </>
        ) : (
          "Confirmar pedido"
        )}
      </Button>
    </div>
  );
}
