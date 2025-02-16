import { useState } from "react";
import { useCreateAppointment } from "./useCreateAppointment";
import { AppointmentFormData } from "@/types/appointment";
import { toast } from "sonner";

export const useAppointmentForm = (onSuccess?: () => void) => {
  const [showForm, setShowForm] = useState(false);
  const createAppointment = useCreateAppointment();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const appointmentData: AppointmentFormData = {
      pet_name: formData.get("pet_name") as string,
      owner_name: formData.get("owner_name") as string,
      owner_email: formData.get("owner_email") as string,
      owner_phone: formData.get("owner_phone") as string,
      appointment_date: formData.get("appointment_date") as string,
      reason: formData.get("reason") as string,
      pet_type: formData.get("pet_type") as "dog" | "cat" | "bird" | "other",
      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      await createAppointment.mutateAsync(appointmentData);
      toast.success("Cita creada exitosamente");
      formElement.reset();
      setShowForm(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Error al crear la cita");
      console.error("Error al crear la cita:", error);
    }
  };

  return {
    showForm,
    setShowForm,
    handleSubmit,
    isSubmitting: createAppointment.isPending,
  };
};
