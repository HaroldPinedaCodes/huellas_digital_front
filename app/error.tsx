// app/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Icono de error */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Mensaje de error */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Algo salió mal</h1>
          <p className="text-muted-foreground">
            Lo sentimos, tuvimos un problema al procesar tu solicitud. Nuestro
            equipo ha sido notificado y estamos trabajando en ello.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" onClick={() => reset()}>
            Intentar nuevamente
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Volver al inicio
          </Button>
        </div>

        {/* Detalles técnicos (opcional) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message}
            </p>
          </div>
        )}

        {/* Información de contacto */}
        <p className="text-sm text-muted-foreground">
          Si el problema persiste, por favor contacta a nuestro equipo de
          soporte en{" "}
          <a
            href="mailto:soporte@huellasdigital.com"
            className="text-primary hover:underline"
          >
            soporte@huellasdigital.com
          </a>
        </p>
      </div>
    </main>
  );
}
