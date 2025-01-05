// app/loading.tsx

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-4 text-center">
        {/* Animación de carga */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary rounded-full animate-spin border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🐾</span>
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Cargando...</h2>
          <p className="text-muted-foreground">
            Estamos preparando todo para ti y tu mascota
          </p>
        </div>
      </div>
    </div>
  );
}

// Añade estos estilos en tu globals.css
