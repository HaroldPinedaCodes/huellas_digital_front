import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-8">
        {/* Título y subtítulo */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            ¡Ups! Página no encontrada
          </h1>
          <h2 className="text-xl text-muted-foreground">
            Parece que esta página se ha ido a dar un paseo
          </h2>
        </div>

        {/* Ilustración o mensaje amigable */}
        <div className="text-8xl">🐾</div>

        <p className="text-muted-foreground max-w-md mx-auto">
          No te preocupes, a veces nuestras mascotas esconden las cosas. ¿Qué
          tal si volvemos al inicio y buscamos lo que necesitas?
        </p>

        {/* Botón de acción */}
        <Button asChild className="mt-8">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
