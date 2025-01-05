"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUserAction } from "@/data/actions/auth-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/common/zod-errors";
import { StrapiErrors } from "@/components/custom/strapi-errors";
import { SubmitButton } from "@/components/custom/submit-button";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SignupForm() {
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Crea tu cuenta</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Regístrate para acceder a todos nuestros servicios
        </p>
      </div>

      {/* Social Register */}
      <div className="grid grid-cols-1 gap-2">
        {/* <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Registrarse con Github
        </Button> */}
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Registrarse con Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O regístrate con
          </span>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <Card className="shadow-none border-0">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="usuario123"
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
              <p className="text-xs text-muted-foreground">
                La contraseña debe tener al menos 8 caracteres
              </p>
            </div>

            {formState?.strapiErrors && (
              <Alert variant="destructive">
                <AlertDescription>
                  <StrapiErrors error={formState.strapiErrors} />
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <SubmitButton
                className="w-full"
                text="Crear cuenta"
                loadingText="Creando cuenta..."
              />

              <p className="text-xs text-muted-foreground text-center">
                Al crear una cuenta, aceptas nuestros{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  términos y condiciones
                </Link>{" "}
                y nuestra{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  política de privacidad
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/signin"
          className="text-primary hover:underline font-medium"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
