export type PetType = "dog" | "cat" | "bird" | "other";
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface AppointmentFormData {
  pet_name: string; // Nombre de la mascota
  owner_name: string; // Nombre del dueño
  owner_email: string; // Email del dueño
  owner_phone: string; // Teléfono del dueño
  appointment_date: string; // Fecha y hora de la cita
  reason: string; // Motivo de la consulta
  pet_type: PetType; // Tipo de mascota
  notes?: string; // Notas adicionales (opcional)
}

export interface Appointment extends AppointmentFormData {
  id: number;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  date?: string;
  search?: string;
  pet_type?: PetType;
  _sort?: string;
  _limit?: number;
  _start?: number;
}

// export interface AppointmentFormData extends AppointmentBase {}
export interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}
export interface AppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
  onAppointmentUpdate: (appointment: Appointment) => void;
}
