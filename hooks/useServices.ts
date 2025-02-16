import { useState, useEffect } from "react";
import { getStrapiURL } from "@/lib/utils";

export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  is_active: boolean;
}

interface UseServicesReturn {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  selectedService: Service | null;
  refetch: () => Promise<void>;
  getServiceById: (id: number) => Service | undefined;
  searchServices: (query: string) => Service[];
  getActiveServices: () => Service[];
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${getStrapiURL()}/api/services`);
      const data = await response.json();
      const formattedServices = data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
      setServices(formattedServices);
    } catch (err) {
      setError("Error al cargar los servicios");
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getServiceById = (id: number) => {
    return services.find((service) => service.id === id);
  };

  const searchServices = (query: string) => {
    const searchTerm = query.toLowerCase();
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
    );
  };

  const getActiveServices = () => {
    return services.filter((service) => service.is_active);
  };

  return {
    services,
    isLoading,
    error,
    selectedService,
    refetch: fetchServices,
    getServiceById,
    searchServices,
    getActiveServices,
  };
}
