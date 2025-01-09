import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Product, CartItem } from "@/types/product";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isOpen: false,

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

      clearCart: () => set({ items: [] }),
      setIsOpen: (open) => set({ isOpen: open }),
    }),
    {
      name: "cart-storage",
    }
  )
);
