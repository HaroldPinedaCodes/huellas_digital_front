import { Shield, Check } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

const ProductGuarantee = () => {
  return (
    <Card className="border-emerald-200 bg-emerald-50 mt-8">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          <CardTitle className="text-emerald-700">
            Garantía de Palatibilidad
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-emerald-700 mb-4">
          Si tu mascota no está 100% satisfecha, te devolvemos tu dinero.
        </CardDescription>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
            <span className="text-sm text-emerald-700">
              Garantizamos que tu mascota disfrutará el sabor de nuestro
              alimento
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
            <span className="text-sm text-emerald-700">
              Si no está satisfecho, te reembolsamos el 100% de tu compra
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
            <span className="text-sm text-emerald-700">
              Válido durante los primeros 30 días después de tu compra
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductGuarantee };
