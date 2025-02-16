import React, { useState } from "react";
import { ServiceSelection } from "./ServiceSelection";
import { DateTimeSelection } from "./DateTimeSelection";
import { PetSelection } from "./PetSelection";
import { AppointmentConfirmation } from "./AppointmentConfirmation";
import { SuccessStep } from "./SuccessStep";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

interface TimeSlot {
  start_time: string;
  end_time: string;
  duration: number;
}

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string;
}

interface AppointmentData {
  service: Service | null;
  dateTime: {
    date: Date | null;
    timeSlot: TimeSlot | null;
  } | null;
  pet: Pet | null;
  notes: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

const steps: Step[] = [
  {
    id: "service",
    title: "Servicio",
    description: "Selecciona el servicio que necesitas",
    component: ServiceSelection,
  },
  {
    id: "datetime",
    title: "Fecha y Hora",
    description: "Elige el horario que prefieras",
    component: DateTimeSelection,
  },
  {
    id: "pet",
    title: "Mascota",
    description: "Selecciona o registra tu mascota",
    component: PetSelection,
  },
  {
    id: "confirmation",
    title: "Confirmación",
    description: "Revisa y confirma tu cita",
    component: AppointmentConfirmation,
  },
  {
    id: "success",
    title: "Completado",
    description: "¡Cita agendada con éxito!",
    component: SuccessStep,
  },
];

export const AppointmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    service: null,
    dateTime: null,
    pet: null,
    notes: "",
  });

  const progress = (currentStep / (steps.length - 1)) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAppointmentData({
      service: null,
      dateTime: null,
      pet: null,
      notes: "",
    });
  };

  const handleUpdateData = (data: Partial<AppointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center flex-1",
                index < currentStep
                  ? "text-blue-600"
                  : index === currentStep
                  ? "text-blue-600"
                  : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2",
                  index < currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : index === currentStep
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-200 text-gray-400"
                )}
              >
                {index + 1}
              </div>
              <div className="text-sm font-medium text-center">
                {step.title}
              </div>
              <div className="text-xs text-gray-500 text-center hidden md:block">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <CurrentStepComponent
          data={appointmentData}
          onUpdate={handleUpdateData}
          onNext={handleNext}
          onBack={handleBack}
          onReset={handleReset}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
    </div>
  );
};
