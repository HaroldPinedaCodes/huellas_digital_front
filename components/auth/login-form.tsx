import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth-service";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await authService.login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      // Guardar token
      localStorage.setItem("token", response.jwt);

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Credenciales inválidas",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              placeholder="correo@ejemplo.com"
              type="email"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Input
              name="password"
              placeholder="Contraseña"
              type="password"
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
