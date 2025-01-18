import { StateCreator } from "zustand";
import { toast } from "sonner";
import { DeliveryFormValues, PaymentFormValues } from "@/schema/checkout";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface CheckoutSlice {
  // Estado
  step: "delivery" | "payment" | "confirmation";
  deliveryInfo: DeliveryFormValues | null;
  paymentInfo: PaymentFormValues | null;
  selectedAddress: Address | null;
  isProcessing: boolean;
  user: User | null;

  // Navegación
  setStep: (step: "delivery" | "payment" | "confirmation") => void;
  nextStep: () => void;
  prevStep: () => void;

  // Información de entrega y pago
  setDeliveryInfo: (info: DeliveryFormValues) => void;
  setPaymentInfo: (info: PaymentFormValues) => void;
  setSelectedAddress: (address: Address) => void;

  // Usuario y direcciones
  setUser: (user: User) => void;
  addAddress: (address: Address) => void;
  updateAddress: (index: number, address: Address) => void;
  removeAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;

  // Control de proceso
  startProcessing: () => void;
  finishProcessing: () => void;
  clearCheckout: () => void;
}

export const createCheckoutSlice: StateCreator<CheckoutSlice> = (set, get) => ({
  // Estado inicial
  step: "delivery",
  deliveryInfo: null,
  paymentInfo: null,
  selectedAddress: null,
  isProcessing: false,
  user: null,

  // Navegación
  setStep: (step) => set({ step }),
  nextStep: () => {
    const currentStep = get().step;
    switch (currentStep) {
      case "delivery":
        set({ step: "payment" });
        break;
      case "payment":
        set({ step: "confirmation" });
        break;
    }
  },
  prevStep: () => {
    const currentStep = get().step;
    switch (currentStep) {
      case "payment":
        set({ step: "delivery" });
        break;
      case "confirmation":
        set({ step: "payment" });
        break;
    }
  },

  // Información de entrega y pago
  setDeliveryInfo: (info) => {
    set({ deliveryInfo: info });
    toast.success("Información de envío guardada");
  },

  setPaymentInfo: (info: PaymentFormValues) => {
    console.log("Setting payment info:", info); // Debug
    set((state) => ({
      ...state,
      paymentInfo: info,
    }));
    toast.success("Información de pago guardada");
  },

  setSelectedAddress: (address) => {
    set({
      selectedAddress: address,
      deliveryInfo: {
        ...get().deliveryInfo,
        address: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      } as DeliveryFormValues,
    });
  },

  // Usuario y direcciones
  setUser: (user) => set({ user }),

  addAddress: (address) => {
    const user = get().user;
    if (!user) return;

    const newAddresses = [...user.addresses, address];
    set({
      user: {
        ...user,
        addresses: newAddresses,
      },
    });
  },

  updateAddress: (index, address) => {
    const user = get().user;
    if (!user) return;

    const addresses = [...user.addresses];
    addresses[index] = address;
    set({
      user: {
        ...user,
        addresses,
      },
    });
  },

  removeAddress: (index) => {
    const user = get().user;
    if (!user) return;

    const addresses = user.addresses.filter((_, i) => i !== index);
    set({
      user: {
        ...user,
        addresses,
      },
    });
  },

  setDefaultAddress: (index) => {
    const user = get().user;
    if (!user) return;

    const addresses = user.addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    set({
      user: {
        ...user,
        addresses,
      },
    });
  },

  // Control de proceso
  startProcessing: () => set({ isProcessing: true }),
  finishProcessing: () => set({ isProcessing: false }),

  clearCheckout: () => {
    set({
      step: "delivery",
      deliveryInfo: null,
      paymentInfo: null,
      selectedAddress: null,
      isProcessing: false,
    });
  },
});
