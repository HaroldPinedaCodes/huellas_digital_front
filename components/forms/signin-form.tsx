// components/forms/signin-form.tsx
"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginUserAction } from "@/data/actions/auth-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

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

export function SigninForm() {
  const [formState, formAction] = useActionState(
    loginUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Accede a tu cuenta
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-1 gap-2">
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Continuar con Github
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Continuar con Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <Card className="shadow-none border-0">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="email"
                placeholder="correo@ejemplo.com"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>

            {formState?.strapiErrors && (
              <Alert variant="destructive">
                <AlertDescription>
                  <StrapiErrors error={formState.strapiErrors} />
                </AlertDescription>
              </Alert>
            )}

            <SubmitButton
              className="w-full"
              text="Iniciar sesión"
              loadingText="Iniciando sesión..."
            />
          </CardContent>
        </Card>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/signup"
          className="text-primary hover:underline font-medium"
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
}
