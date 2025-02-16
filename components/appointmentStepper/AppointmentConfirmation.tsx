import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, User, Heart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AppointmentConfirmationProps {
  data: {
    service: {
      name: string;
      duration: number;
      price: number;
    };
    dateTime: {
      date: Date;
      timeSlot: {
        start_time: string;
        end_time: string;
      };
    };
    pet: {
      name: string;
      species: string;
      breed: string;
    };
  };
  onUpdate: (data: { notes: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AppointmentConfirmation: React.FC<
  AppointmentConfirmationProps
> = ({ data, onUpdate, onNext, onBack }) => {
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Crear el objeto de la cita
      const appointmentData = {
        service: data.service,
        date: data.dateTime.date,
        timeSlot: data.dateTime.timeSlot,
        pet: data.pet,
        notes: notes,
      };

      // Llamada a la API para crear la cita
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: appointmentData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cita");
      }

      onUpdate({ notes });
      onNext();
    } catch (error) {
      console.error("Error:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Confirma tu cita</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border space-y-3">
            <h3 className="font-semibold text-lg">Detalles de la cita</h3>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>
                {format(
                  new Date(data.dateTime.date),
                  "EEEE d 'de' MMMM, yyyy",
                  {
                    locale: es,
                  }
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>
                {format(new Date(data.dateTime.timeSlot.start_time), "HH:mm")} -{" "}
                {format(new Date(data.dateTime.timeSlot.end_time), "HH:mm")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Servicio: {data.service.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-500" />
              <span>
                Mascota: {data.pet.name} ({data.pet.species} - {data.pet.breed})
              </span>
            </div>
          </div>

          <Alert>
            <AlertTitle>Información importante</AlertTitle>
            <AlertDescription>
              Por favor, llega 10 minutos antes de tu cita. Si necesitas
              cancelar, hazlo con al menos 24 horas de anticipación.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="notes" className="block font-medium mb-2">
              Notas adicionales
            </label>
            <Textarea
              id="notes"
              placeholder="Describe cualquier síntoma o información relevante para la cita..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-32"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Resumen de costos</h3>
            <div className="flex justify-between items-center">
              <span>{data.service.name}</span>
              <span className="font-medium">${data.service.price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white"
        >
          {isSubmitting ? "Confirmando..." : "Confirmar cita"}
        </Button>
      </div>
    </div>
  );
};
