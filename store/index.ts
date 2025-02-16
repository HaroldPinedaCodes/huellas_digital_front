import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartSlice, createCartSlice } from "./slices/cartSlice";
import { CheckoutSlice, createCheckoutSlice } from "./slices/checkoutSlice";
import {
  AppointmentSlice,
  createAppointmentSlice,
} from "./slices/appointmentSlice";

// Tipos combinados
export interface StoreState
  extends CartSlice,
    CheckoutSlice,
    AppointmentSlice {}

// Mantenemos el useCart original para compatibilidad
export const useCart = create<CartSlice & CheckoutSlice>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createCheckoutSlice(...a),
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        items: state.items,
        deliveryInfo: state.deliveryInfo,
        user: state.user,
        selectedAddress: state.selectedAddress,
      }),
    }
  )
);

// Nuevo store que incluye todas las funcionalidades
export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createCheckoutSlice(...a),
      ...createAppointmentSlice(...a),
    }),
    {
      name: "store",
      partialize: (state) => ({
        items: state.items,
        deliveryInfo: state.deliveryInfo,
        user: state.user,
        selectedAddress: state.selectedAddress,
        appointments: state.appointments,
        filters: state.filters,
      }),
    }
  )
);

// Helper para tipado
export const useStoreSelector = <T>(selector: (state: StoreState) => T): T => {
  return useStore(selector);
};
