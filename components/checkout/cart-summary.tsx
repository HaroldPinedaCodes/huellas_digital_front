"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store";

export function CartSummary() {
  const { items, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const total = getTotalPrice();

  // Esperar a que el componente se monte para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h3 className="font-medium text-lg">Resumen de la orden</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 className="font-medium text-lg">Resumen de la orden</h3>

      {/* Lista de productos */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <div>
              <span>{item.quantity}x </span>
              <span>{item.product.name}</span>
            </div>
            <span>
              ${(item.product.priceClient * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Subtotal y envío */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>Calculado en el siguiente paso</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-medium">${total.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Los impuestos y el envío se calcularán en el siguiente paso
        </p>
      </div>
    </div>
  );
}
