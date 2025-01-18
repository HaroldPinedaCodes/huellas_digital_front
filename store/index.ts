import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartSlice, createCartSlice } from "./slices/cartSlice";
import { CheckoutSlice, createCheckoutSlice } from "./slices/checkoutSlice";
interface StoreState extends CartSlice, CheckoutSlice {}
export const useCart = create<StoreState>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createCheckoutSlice(...a),
    }),
    {
      name: "store",
      partialize: (state) => ({
        items: state.items,
        deliveryInfo: state.deliveryInfo,
        user: state.user,
        selectedAddress: state.selectedAddress,
      }),
    }
  )
);
