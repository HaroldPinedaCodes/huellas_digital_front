import { useQuery } from "@tanstack/react-query";
import { getStrapiURL } from "@/lib/utils";
import { useStoreSelector } from "@/store";
import type { Appointment, AppointmentFilters } from "@/types/appointment";
import type { StrapiResponse } from "@/types/strapi";

interface AppointmentData extends StrapiResponse<Appointment> {
  data: Array<{
    id: number;
    attributes: Omit<Appointment, "id">;
  }>;
}

const fetchAppointments = async (filters: AppointmentFilters = {}) => {
  const queryString = new URLSearchParams(
    filters as Record<string, string>
  ).toString();
  const response = await fetch(
    getStrapiURL(`/api/veterinary-appointments?${queryString}`)
  );

  if (!response.ok) {
    throw new Error("Error al obtener las citas");
  }

  const data: AppointmentData = await response.json();

  return data.data.map((item) => ({
    ...item.attributes,
    id: item.id,
  }));
};

export const useAppointments = (filters: AppointmentFilters = {}) => {
  const setAppointments = useStoreSelector((state) => state.setAppointments);

  return useQuery<Appointment[], Error>({
    queryKey: ["appointments", filters],
    queryFn: () => fetchAppointments(filters),
    staleTime: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => {
      setAppointments(data);
      return data;
    },
  });
};
