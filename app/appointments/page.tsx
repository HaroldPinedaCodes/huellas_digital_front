"use client";

// import { useState } from "react";
// import { AppointmentForm } from "@/components/appointments/AppointmentForm";
// import { useAppointments } from "@/hooks/appointment/useAppointments";
// import { useAuth } from "@/contexts/auth-context";
// import { Button } from "@/components/ui/button";
import { AppointmentStepper } from "@/components/appointmentStepper/AppointmentStepper";

export default function AppointmentsPage() {
  // const [viewMode, setViewMode] = useState<"form" | "list">("form");
  // const { user } = useAuth();
  // const { data: appointments, isLoading: appointmentsLoading } =
  //   useAppointments();

  // const AppointmentsList = () => {
  //   if (!user) {
  //     return (
  //       <div className="text-center p-8 bg-gray-50 rounded-lg">
  //         <h3 className="text-lg font-semibold text-gray-700 mb-2">
  //           Inicia sesión para ver tus citas
  //         </h3>
  //         <p className="text-gray-600 mb-4">
  //           Necesitas una cuenta para ver el historial de citas
  //         </p>
  //         <Button
  //           onClick={() => setViewMode("form")}
  //           className="bg-blue-500 hover:bg-blue-600"
  //         >
  //           Volver al formulario
  //         </Button>
  //       </div>
  //     );
  //   }

  //   if (!appointments?.length) {
  //     return (
  //       <div className="text-center p-8 bg-gray-50 rounded-lg">
  //         <h3 className="text-lg font-semibold text-gray-700 mb-2">
  //           No tienes citas programadas
  //         </h3>
  //         <p className="text-gray-600 mb-4">
  //           ¿Deseas agendar una cita veterinaria?
  //         </p>
  //         <Button
  //           onClick={() => setViewMode("form")}
  //           className="bg-blue-500 hover:bg-blue-600"
  //         >
  //           Agendar Nueva Cita
  //         </Button>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="space-y-4">
  //       {appointments.map((appointment) => (
  //         <div key={appointment.id} className="bg-white p-4 rounded-lg shadow">
  //           <div className="flex justify-between items-start">
  //             <div>
  //               <h3 className="font-semibold">
  //                 {appointment.pet_name} ({appointment.pet_type})
  //               </h3>
  //               <p className="text-sm text-gray-600">
  //                 Dueño: {appointment.owner_name}
  //               </p>
  //             </div>
  //             <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
  //               {new Date(appointment.appointment_date).toLocaleString()}
  //             </span>
  //           </div>
  //           <p className="mt-2">{appointment.reason}</p>
  //           {appointment.notes && (
  //             <p className="mt-2 text-sm text-gray-600">{appointment.notes}</p>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="container mx-auto p-4 mt-28">
      <AppointmentStepper />

      {/* <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Citas Veterinarias</h1>
            {user && (
              <p className="text-sm text-gray-600">
                Bienvenido, {user.username}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {user && (
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "outline"}
              >
                Mis Citas
              </Button>
            )}
          </div>
        </div>

        {viewMode === "form" ? (
          // Mostrar el formulario independientemente del estado de autenticación
          <AppointmentForm
            onSuccess={() => {
              setViewMode(user ? "list" : "form");
            }}
            user={user || (undefined as any)}
          />
        ) : (
          // Lista de citas solo si no estamos en modo formulario
          <>
            {appointmentsLoading ? (
              <div className="flex justify-center p-8">
                <div className="text-gray-500">Cargando tus citas...</div>
              </div>
            ) : (
              <AppointmentsList />
            )}
          </>
        )}
      </div> */}
    </div>
  );
}
