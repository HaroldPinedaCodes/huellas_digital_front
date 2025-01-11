// import { useCart } from "@/store";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ConfirmationStepProps {
  onComplete: () => void;
}

export function ConfirmationStep({ onComplete }: ConfirmationStepProps) {
  // const { items } = useCart();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Resumen del pedido</h3>
        <p className="text-sm text-muted-foreground">
          Por favor revisa los detalles de tu pedido antes de confirmar.
        </p>
      </div>

      {/* Detalles de envío */}
      <Card className="p-6">
        <h4 className="font-medium mb-2">Información de envío</h4>
        {/* Aquí mostrarías la información de envío */}
      </Card>

      {/* Detalles de pago */}
      <Card className="p-6">
        <h4 className="font-medium mb-2">Información de pago</h4>
        {/* Aquí mostrarías la información de pago */}
      </Card>

      <Button onClick={onComplete} className="w-full">
        Confirmar pedido
      </Button>
    </div>
  );
}
