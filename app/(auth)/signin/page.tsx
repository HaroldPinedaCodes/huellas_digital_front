import { SigninForm } from "@/components/forms/signin-form";

export default function SignInRoute() {
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
            <h1 className="text-4xl font-bold mb-4">
              Bienvenido a Huellas Digital
            </h1>
            <p className="text-lg opacity-90">
              Tu tienda de confianza para el cuidado de tus mascotas
            </p>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Accede a tu cuenta</h2>
              <p className="text-gray-600 mt-2">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <SigninForm />
          </div>
        </div>
      </div>
    </div>
  );
}
