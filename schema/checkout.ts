import * as z from "zod";

export const deliverySchema = z.object({
  fullName: z.string().min(1, "Nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Teléfono es requerido"),
  address: z.string().min(1, "Dirección es requerida"),
  city: z.string().min(1, "Ciudad es requerida"),
  state: z.string().min(1, "Estado es requerido"),
  zipCode: z.string().min(1, "Código postal es requerido"),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "pse", "cash"]),
  cardNumber: z.string().optional().nullable(),
  cardExpiry: z.string().optional().nullable(),
  cardCvc: z.string().optional().nullable(),
});

export type DeliveryFormValues = z.infer<typeof deliverySchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
