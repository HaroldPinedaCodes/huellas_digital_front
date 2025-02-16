import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppointmentFormData, Appointment } from "@/types/appointment";
import { StrapiSingleResponse } from "@/types/strapi";
import { getStrapiURL } from "@/lib/utils";
import { useStoreSelector } from "@/store";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const addAppointment = useStoreSelector((state) => state.addAppointment);

  return useMutation<
    StrapiSingleResponse<Appointment>,
    Error,
    AppointmentFormData,
    unknown
  >({
    mutationFn: async (data: AppointmentFormData) => {
      const response = await fetch(
        getStrapiURL("/api/veterinary-appointments"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...data,
              status: "pending",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la cita");
      }

      return response.json();
    },
    onSuccess: (response) => {
      if (response.data) {
        // Creamos el appointment combinando solo los attributes con el id
        const appointment: Appointment = {
          ...response.data.attributes,
          id: response.data.id,
        };
        addAppointment(appointment);
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      }
    },
  });
};
