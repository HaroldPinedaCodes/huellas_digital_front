import React from "react";
import { useCreateAppointment } from "@/hooks/appointment/useCreateAppointment";
import { AppointmentFormData } from "@/types/appointment";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  user: User;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSuccess,
  onCancel,
  user,
}) => {
  const createAppointmentMutation = useCreateAppointment();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const appointmentData: AppointmentFormData = {
      pet_name: formData.get("pet_name") as string,
      owner_name: user.username,
      owner_email: user.email,
      owner_phone: formData.get("owner_phone") as string,
      appointment_date: formData.get("appointment_date") as string,
      reason: formData.get("reason") as string,
      pet_type: formData.get("pet_type") as "dog" | "cat" | "bird" | "other",
      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      await createAppointmentMutation.mutateAsync(appointmentData);
      toast.success("Cita agendada exitosamente");
      e.currentTarget.reset();
      onSuccess?.();
    } catch {
      toast.error("Error al agendar la cita");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Información de la mascota */}
          <div>
            <label
              htmlFor="pet_name"
              className="block text-sm font-medium mb-1"
            >
              Nombre de la mascota
            </label>
            <input
              id="pet_name"
              name="pet_name"
              type="text"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="pet_type"
              className="block text-sm font-medium mb-1"
            >
              Tipo de mascota
            </label>
            <select
              id="pet_type"
              name="pet_type"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
              <option value="bird">Ave</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Información del dueño - Solo teléfono editable */}
          <div>
            <label
              htmlFor="owner_phone"
              className="block text-sm font-medium mb-1"
            >
              Teléfono de contacto
            </label>
            <input
              id="owner_phone"
              name="owner_phone"
              type="tel"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="appointment_date"
              className="block text-sm font-medium mb-1"
            >
              Fecha y hora de la cita
            </label>
            <input
              id="appointment_date"
              name="appointment_date"
              type="datetime-local"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Información de la cita */}
          <div className="md:col-span-2">
            <label htmlFor="reason" className="block text-sm font-medium mb-1">
              Motivo de la consulta
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={3}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notas adicionales
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button type="button" onClick={onCancel} variant="outline">
              Cancelar
            </Button>
          )}
          <Button
            className="text-white"
            type="submit"
            disabled={createAppointmentMutation.isPending}
          >
            {createAppointmentMutation.isPending
              ? "Agendando..."
              : "Agendar Cita"}
          </Button>
        </div>
      </form>
    </div>
  );
};
