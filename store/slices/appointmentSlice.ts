import { StateCreator } from "zustand";
import { toast } from "sonner";
import { Appointment, AppointmentStatus } from "@/types/appointment";

export interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  filters: {
    status?: AppointmentStatus;
    date?: string;
    search?: string;
  };
}

export interface AppointmentActions {
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
  removeAppointment: (id: number) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  setFilters: (filters: Partial<AppointmentState["filters"]>) => void;
  clearFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  clearAppointments: () => void;
}

export interface AppointmentSlice
  extends AppointmentState,
    AppointmentActions {}

export const createAppointmentSlice: StateCreator<
  AppointmentSlice,
  [],
  [],
  AppointmentSlice
> = (set) => ({
  // Estado inicial
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  filters: {},

  // Acciones
  setAppointments: (appointments) => {
    set({ appointments });
  },

  addAppointment: (appointment) => {
    set((state) => ({
      appointments: [...state.appointments, appointment],
    }));
    toast.success("Cita agendada exitosamente");
  },

  updateAppointment: (id, updatedAppointment) => {
    set((state) => ({
      appointments: state.appointments.map((app) =>
        app.id === id ? { ...app, ...updatedAppointment } : app
      ),
    }));
    toast.success("Cita actualizada exitosamente");
  },

  removeAppointment: (id) => {
    set((state) => ({
      appointments: state.appointments.filter((app) => app.id !== id),
    }));
    toast.success("Cita eliminada exitosamente");
  },

  setSelectedAppointment: (appointment) => {
    set({ selectedAppointment: appointment });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  clearAppointments: () => {
    set({
      appointments: [],
      selectedAppointment: null,
      filters: {},
    });
  },
});
