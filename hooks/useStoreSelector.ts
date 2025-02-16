import { useStore } from "@/store";
import type { StoreState } from "@/store";

export function useStoreSelector<T>(selector: (state: StoreState) => T): T {
  return useStore(selector);
}

// Ejemplo de uso en los hooks:
export const useAppointmentActions = () => {
  return useStoreSelector((state) => ({
    addAppointment: state.addAppointment,
    updateAppointment: state.updateAppointment,
    removeAppointment: state.removeAppointment,
    setLoading: state.setLoading,
  }));
};
