"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { paymentSchema } from "@/schema/checkout";

interface PaymentFormProps {
  onComplete: () => void;
}

export function PaymentForm({ onComplete }: PaymentFormProps) {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-8">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de pago</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <Card className="p-4 cursor-pointer">
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="sr-only"
                    />
                    <label htmlFor="card" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>Tarjeta de crédito</span>
                      </div>
                    </label>
                  </Card>

                  <Card className="p-4 cursor-pointer">
                    <RadioGroupItem value="pse" id="pse" className="sr-only" />
                    <label htmlFor="pse" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>PSE</span>
                      </div>
                    </label>
                  </Card>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de tarjeta</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="4242 4242 4242 4242" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de expiración</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="MM/YY" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardCvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          Continuar
        </Button>
      </form>
    </Form>
  );
}
