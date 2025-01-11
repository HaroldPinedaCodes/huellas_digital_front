"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeliveryFormValues, deliverySchema } from "@/schema/checkout";
import { useCart } from "@/store";

interface DeliveryFormProps {
  onComplete: () => void;
}

export function DeliveryForm({ onComplete }: DeliveryFormProps) {
  const { setDeliveryInfo, deliveryInfo } = useCart();

  const defaultValues: DeliveryFormValues = {
    fullName: deliveryInfo?.fullName || "",
    email: deliveryInfo?.email || "",
    address: deliveryInfo?.address || "",
    city: deliveryInfo?.city || "",
    state: deliveryInfo?.state || "",
    zipCode: deliveryInfo?.zipCode || "",
    phone: deliveryInfo?.phone || "",
  };

  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
    defaultValues, // Usa valores iniciales asegurados
  });

  function onSubmit(values: DeliveryFormValues) {
    setDeliveryInfo(values);
    onComplete();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continuar al pago</Button>
      </form>
    </Form>
  );
}
