"use client";

import { Fragment } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store";
import { CartItem } from "./cart-item";
import Link from "next/link";

export function CartSheet() {
  const { items, isOpen, setIsOpen } = useCart();

  // Calcular totales
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.product.priceClient * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito de compras ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <span className="text-muted-foreground">Tu carrito está vacío</span>
          </div>
        ) : (
          <Fragment>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4 pr-4">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between text-base font-medium">
                <span>Total</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceder al pago</Button>
              </Link>
            </div>
          </Fragment>
        )}
      </SheetContent>
    </Sheet>
  );
}
