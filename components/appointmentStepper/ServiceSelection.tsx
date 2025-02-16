"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import { getStrapiURL } from "@/lib/utils";

interface Service {
  id: number;
  documentId: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_active: boolean;
}

interface ServiceSelectionProps {
  data: { service: Service | null };
  onUpdate: (data: { service: Service }) => void;
  onNext: () => void;
  isFirstStep: boolean;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(
    data.service
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = `${getStrapiURL()}api/services`;
        console.log("Fetching services from:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Services fetched:", result.data);
        setServices(result.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Error al cargar los servicios. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = (service: Service) => {
    console.log("ServiceSelection - Selecting service:", {
      id: service.id,
      name: service.name,
      fullService: service,
    });

    setSelectedService(service);

    // Asegurarse de que el servicio tiene la estructura correcta
    const serviceToUpdate = {
      id: service.id,
      documentId: service.documentId,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      publishedAt: service.publishedAt,
      is_active: service.is_active,
    };

    console.log("ServiceSelection - Updating with:", serviceToUpdate);
    onUpdate({ service: serviceToUpdate });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Selecciona un servicio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.map((service) => {
          // Determinar si los datos están en attributes o directamente en el objeto
          const serviceData = service || service;

          console.log("Rendering service:", {
            id: service.id,
            name: serviceData.name,
            data: serviceData,
          });

          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all ${
                selectedService?.id === service.id
                  ? "border-2 border-blue-500"
                  : "hover:border-blue-200"
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {serviceData.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {serviceData.description}
                </p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{serviceData.duration} min</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>${serviceData.price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedService}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
