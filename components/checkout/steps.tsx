"use client";

import { useState } from "react";
import { useCart } from "@/store/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryForm } from "@/components/forms/delivery-form";
import { PaymentForm } from "@/components/forms/payment-form";
import { ConfirmationStep } from "./confirmation-step";
import { Link } from "lucide-react";
import { Button } from "../ui/button";

export function Steps() {
  const [activeStep, setActiveStep] = useState("delivery");
  const { items, deliveryInfo, paymentInfo } = useCart();

  // Verificar si hay información de envío
  const hasDeliveryInfo = deliveryInfo !== null;
  // Verificar si hay información de pago
  const hasPaymentInfo = hasDeliveryInfo && paymentInfo !== null;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p>Tu carrito está vacío</p>
        <Button asChild className="mt-4">
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
    );
  }

  return (
    <Tabs value={activeStep} onValueChange={setActiveStep}>
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="delivery">Envío</TabsTrigger>
        <TabsTrigger value="payment" disabled={!hasDeliveryInfo}>
          Pago
        </TabsTrigger>
        <TabsTrigger value="confirmation" disabled={!hasPaymentInfo}>
          Confirmación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="delivery">
        <DeliveryForm onComplete={() => setActiveStep("payment")} />
      </TabsContent>

      <TabsContent value="payment">
        <PaymentForm onComplete={() => setActiveStep("confirmation")} />
      </TabsContent>

      <TabsContent value="confirmation">
        <ConfirmationStep onComplete={() => {}} />
      </TabsContent>
    </Tabs>
  );
}
