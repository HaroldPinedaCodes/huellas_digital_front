// store/index.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Product, CartItem } from "@/types/product";
import { DeliveryFormValues, PaymentFormValues } from "@/schema/checkout";

interface CartStore {
  // Estado
  items: CartItem[];
  isOpen: boolean;
  deliveryInfo: DeliveryFormValues | null;
  paymentInfo: PaymentFormValues | null;

  // Acciones
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  getTotalPrice: () => number;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
  setDeliveryInfo: (info: DeliveryFormValues) => void;
  setPaymentInfo: (info: PaymentFormValues) => void;
  clearCheckout: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      deliveryInfo: null,
      paymentInfo: null,

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          toast.error("Producto ya está en el carrito");
          return;
        }

        set({
          items: [...currentItems, { product, quantity: 1 }],
          isOpen: true,
        });
        toast.success("Producto agregado al carrito");
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
        toast.success("Producto eliminado del carrito");
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.priceClient * item.quantity,
          0
        );
      },

      clearCart: () => set({ items: [] }),

      setIsOpen: (open) => set({ isOpen: open }),

      setDeliveryInfo: (info) => {
        set({ deliveryInfo: info });
        toast.success("Información de envío guardada");
      },

      setPaymentInfo: (info) => {
        set({ paymentInfo: info });
        toast.success("Información de pago guardada");
      },

      clearCheckout: () => {
        set({
          deliveryInfo: null,
          paymentInfo: null,
          items: [],
          isOpen: false,
        });
      },
    }),
    {
      name: "cart-storage",
      // Solo persistir items y deliveryInfo
      partialize: (state) => ({
        items: state.items,
        deliveryInfo: state.deliveryInfo,
      }),
    }
  )
);
