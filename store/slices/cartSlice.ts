import { StateCreator } from "zustand";
import { toast } from "sonner";
import { Product, CartItem } from "@/types/product";

export interface CartSlice {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
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
    const { items } = get();
    return items.reduce(
      (acc, item) => acc + item.product.priceClient * item.quantity,
      0
    );
  },

  clearCart: () => set({ items: [] }),
  setIsOpen: (open) => set({ isOpen: open }),
});
