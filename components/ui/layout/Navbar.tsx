import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// components/layout/Navbar.tsx
const Navbar = () => {
  return (
    <NavigationMenu className="w-full px-4 py-3 border-b">
      <NavigationMenuList className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <NavigationMenuItem>
          <Link href="/" className="text-xl font-bold">
            PetShop
          </Link>
        </NavigationMenuItem>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input placeholder="Buscar productos..." className="w-64 pl-10" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
