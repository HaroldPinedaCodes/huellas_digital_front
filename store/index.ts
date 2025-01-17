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

      // Métodos para manejar items del carrito
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          toast.error("Producto ya está en el carrito");
          return;
        }

        set((state) => ({
          items: [...state.items, { product, quantity: 1 }],
          isOpen: true,
        }));
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

      // Métodos para manejar información de checkout
      setDeliveryInfo: (info: DeliveryFormValues) => {
        console.log("Intentando guardar información de envío:", info);

        set((state) => {
          const newState = {
            ...state,
            deliveryInfo: { ...info },
          };
          console.log("Estado actualizado:", newState);
          return newState;
        });

        // Verificar que se guardó correctamente
        const currentState = get();
        if (currentState.deliveryInfo) {
          console.log(
            "Información de envío guardada exitosamente:",
            currentState.deliveryInfo
          );
          toast.success("Información de envío guardada");
        } else {
          console.error(
            "Error: La información de envío no se guardó correctamente"
          );
          toast.error("Error al guardar la información de envío");
        }
      },

      setPaymentInfo: (info: PaymentFormValues) => {
        console.log("Guardando información de pago:", info);

        set((state) => {
          const newState = {
            ...state,
            paymentInfo: { ...info },
          };
          console.log("Estado actualizado con info de pago:", newState);
          return newState;
        });

        const currentState = get();
        if (currentState.paymentInfo) {
          toast.success("Información de pago guardada");
        } else {
          toast.error("Error al guardar la información de pago");
        }
      },

      clearCheckout: () => {
        console.log("Limpiando información de checkout");
        set((state) => ({
          ...state,
          deliveryInfo: null,
          paymentInfo: null,
          items: [],
          isOpen: false,
        }));
        console.log("Checkout limpiado:", get());
      },
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log("Recuperando datos del storage:", name);
          try {
            const data = str ? JSON.parse(str) : null;
            console.log("Datos recuperados:", data);
            return data;
          } catch (error) {
            console.error("Error al recuperar datos del storage:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          console.log("Guardando en storage:", name, value);
          try {
            localStorage.setItem(name, JSON.stringify(value));
            console.log("Datos guardados correctamente en storage");
          } catch (error) {
            console.error("Error al guardar en storage:", error);
          }
        },
        removeItem: (name) => {
          console.log("Eliminando del storage:", name);
          localStorage.removeItem(name);
        },
      },
      partialize: (state: CartStore): Partial<CartStore> => ({
        items: state.items,
        deliveryInfo: state.deliveryInfo,
      }),
    }
  )
);
