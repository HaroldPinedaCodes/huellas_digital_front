import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Share2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SuccessStepProps {
  data: {
    service: {
      name: string;
      duration: number;
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
    };
  };
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ data, onReset }) => {
  const addToCalendar = () => {
    const startTime = new Date(data.dateTime.timeSlot.start_time);
    const endTime = new Date(data.dateTime.timeSlot.end_time);

    const event = {
      title: `Cita veterinaria - ${data.pet.name}`,
      description: `Servicio: ${data.service.name}\nMascota: ${data.pet.name}`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      location: "Clínica Veterinaria",
    };

    // Crear URL para Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&dates=${event.startTime.replace(/[-:]/g, "")}/${event.endTime.replace(
      /[-:]/g,
      ""
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">¡Cita agendada con éxito!</h2>
        <p className="text-gray-600">
          Te enviaremos un correo de confirmación con los detalles de tu cita
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold mb-4">Detalles de la cita</h3>
        <div className="space-y-3 text-left">
          <p>
            <span className="font-medium">Servicio:</span> {data.service.name}
          </p>
          <p>
            <span className="font-medium">Mascota:</span> {data.pet.name}
          </p>
          <p>
            <span className="font-medium">Fecha:</span>{" "}
            {format(new Date(data.dateTime.date), "EEEE d 'de' MMMM", {
              locale: es,
            })}
          </p>
          <p>
            <span className="font-medium">Hora:</span>{" "}
            {format(new Date(data.dateTime.timeSlot.start_time), "HH:mm")} -{" "}
            {format(new Date(data.dateTime.timeSlot.end_time), "HH:mm")}
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 pt-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={addToCalendar}
        >
          <Calendar className="w-4 h-4" />
          <span>Agregar al calendario</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Mi cita veterinaria",
                text: `Tengo una cita veterinaria para ${
                  data.pet.name
                } el ${format(
                  new Date(data.dateTime.date),
                  "EEEE d 'de' MMMM",
                  { locale: es }
                )} a las ${format(
                  new Date(data.dateTime.timeSlot.start_time),
                  "HH:mm"
                )}`,
              });
            }
          }}
        >
          <Share2 className="w-4 h-4" />
          <span>Compartir</span>
        </Button>
      </div>

      <div className="pt-6">
        <Button variant="outline" onClick={onReset}>
          Agendar otra cita
        </Button>
      </div>
    </div>
  );
};
