export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Renderiza 8 skeletons por defecto */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          {/* Imagen */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

          {/* Contenido */}
          <div className="space-y-2 p-2">
            {/* Marca */}
            <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />

            {/* Nombre del producto */}
            <div className="space-y-1">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>

            {/* Precio y botón */}
            <div className="flex justify-between items-center pt-2">
              <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
