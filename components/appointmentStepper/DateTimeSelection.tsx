"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getStrapiURL } from "@/lib/utils";

interface TimeSlot {
  start_time: string;
  end_time: string;
  duration: number;
}

interface DateTimeSelectionProps {
  data: {
    service: {
      id: number;
    } | null;
    dateTime: {
      date: Date | null;
      timeSlot: TimeSlot | null;
    } | null;
  };
  onUpdate: (data: { dateTime: { date: Date; timeSlot: TimeSlot } }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    data.dateTime?.date || undefined
  );
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    data.dateTime?.timeSlot || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate && data.service?.id) {
      console.log("DateTimeSelection - Service data:", {
        service: data.service,
        selectedDate,
      });
      fetchTimeSlots(selectedDate, data.service.id);
    }
  }, [selectedDate, data.service?.id]);

  const fetchTimeSlots = async (date: Date, serviceId: number) => {
    setLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");

      console.log("DateTimeSelection - Fetching slots with:", {
        date: formattedDate,
        serviceId,
        fullServiceData: data.service,
      });

      // Modificar cómo construimos los parámetros de consulta
      const params = new URLSearchParams({
        date: formattedDate,
        serviceIds: serviceId.toString(), // Cambio aquí
      });

      const url = `${getStrapiURL()}api/available-slots?${params.toString()}`;
      console.log("DateTimeSelection - Request URL:", url);

      const response = await fetch(url);
      const responseData = await response.json();

      console.log("DateTimeSelection - Response:", {
        status: response.status,
        ok: response.ok,
        data: responseData,
      });

      if (!response.ok) {
        console.error("DateTimeSelection - Full error details:", responseData);
        setTimeSlots([]);
        return;
      }

      setTimeSlots(responseData.data || []);
    } catch (error) {
      console.error("DateTimeSelection - Full error:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    console.log("Date selected:", date);
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    console.log("Time slot selected:", timeSlot);
    setSelectedTimeSlot(timeSlot);
    if (selectedDate) {
      onUpdate({
        dateTime: {
          date: selectedDate,
          timeSlot,
        },
      });
    }
  };

  const formatTimeSlot = (startTime: string, endTime: string) => {
    // Convertir UTC a hora local
    const start = new Date(startTime);
    const end = new Date(endTime);

    return `${format(start, "h:mm a", { locale: es })} - ${format(
      end,
      "h:mm a",
      { locale: es }
    )}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Selecciona fecha y hora</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendario */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Fecha</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            locale={es}
            className="rounded-md border"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today || date.getDay() === 0;
            }}
          />
        </div>

        {/* Franjas horarias */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Horario disponible</h3>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedDate ? (
            Array.isArray(timeSlots) && timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {formatTimeSlot(slot.start_time, slot.end_time)}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay horarios disponibles para esta fecha
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 py-8">
              Selecciona una fecha para ver los horarios disponibles
            </div>
          )}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTimeSlot}
          className="bg-blue-600 text-white"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
