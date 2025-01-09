"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { CartIcon } from "@/components/cart/cart-icon";

// components/layout/Navbar.tsx
const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between px-2 border-b">
      <Link href="/" className="text-xl font-bold">
        Huellas Digital
      </Link>
      <NavigationMenu className="px-4 py-3 w-full">
        <NavigationMenuList className="max-w-7xl flex justify-between items-center w-full">
          <NavigationMenuItem></NavigationMenuItem>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input placeholder="Buscar productos..." className="w-64 pl-10" />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>

            {/* <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button> */}

            <CartIcon />

            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  <span>Hola, {user.username}</span>
                  <Button onClick={logout} variant="outline">
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <Button onClick={() => router.push("/login")}>
                  Iniciar sesión
                </Button>
              )}
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
