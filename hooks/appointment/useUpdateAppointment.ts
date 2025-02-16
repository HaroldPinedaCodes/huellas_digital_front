import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getStrapiURL } from "@/lib/utils";
import { useStore } from "@/store";
import type { StoreState } from "@/store";
import { Appointment } from "@/types/appointment";

interface UpdateAppointmentParams {
  id: number;
  data: Partial<Appointment>;
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const updateAppointment = useStore(
    (state: StoreState) => state.updateAppointment
  );

  return useMutation<
    StrapiSingleResponse<Appointment>,
    Error,
    UpdateAppointmentParams,
    unknown
  >({
    mutationFn: async ({ id, data }: UpdateAppointmentParams) => {
      const response = await fetch(
        getStrapiURL(`/api/veterinary-appointments/${id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la cita");
      }

      return response.json();
    },
    onSuccess: (response, variables) => {
      if (response.data) {
        updateAppointment(variables.id, response.data.attributes);
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      }
    },
  });
};
