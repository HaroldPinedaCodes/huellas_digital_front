import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store";

export function CartIcon() {
  const { items, setIsOpen } = useCart();

  // Calcular total de items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative bg-primary-foreground text-primary"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
