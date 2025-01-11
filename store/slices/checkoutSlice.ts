import { StateCreator } from "zustand";
import { DeliveryFormValues, PaymentFormValues } from "@/schema/checkout";

export interface CheckoutSlice {
  deliveryInfo: DeliveryFormValues | null;
  paymentInfo: PaymentFormValues | null;
  setDeliveryInfo: (info: DeliveryFormValues) => void;
  setPaymentInfo: (info: PaymentFormValues) => void;
  clearCheckout: () => void;
}

export const createCheckoutSlice: StateCreator<CheckoutSlice> = (set) => ({
  deliveryInfo: null,
  paymentInfo: null,
  setDeliveryInfo: (info) => set({ deliveryInfo: info }),
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  clearCheckout: () => set({ deliveryInfo: null, paymentInfo: null }),
});
