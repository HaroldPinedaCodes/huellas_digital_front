import { SignupForm } from "@/components/forms/signup-form";

export default function SignUpRoute() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner superior */}
      <div className="bg-black text-white text-center text-sm py-1">
        Envío gratis en pedidos superiores a $50.000
      </div>

      {/* Contenedor principal */}
      <div className="flex-1 flex">
        {/* Lado izquierdo - Imagen/Mensaje */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-gray-900 to-gray-800 items-center justify-center p-8">
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-bold mb-4">Únete a Huella Digital</h1>
            <p className="text-lg opacity-90">
              Descubre la mejor selección de productos para tus mascotas
            </p>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
