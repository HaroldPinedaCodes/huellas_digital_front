"use client";

import Link from "next/link";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}

export function Header({ data }: Readonly<HeaderProps>) {
  const { ctaButton } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      )}
    >
      {/* Top bar - opcional */}
      {!isScrolled && (
        <div className="bg-primary text-primary-foreground py-1 text-center text-sm">
          Envío gratis en pedidos superiores a $50.000
        </div>
      )}

      {/* Main header */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Logo text="Huella Digital" />

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/categorias"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Categorías
              </Link>
              <Link
                href="/productos"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Productos
              </Link>
              <Link
                href="/servicios"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Servicios
              </Link>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <div className="relative hidden md:block">
              <Input
                placeholder="Buscar productos..."
                className="w-64 pl-10 bg-gray-50 border-0 focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Link href="/cart">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Link href="/account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Link href={ctaButton.url}>
                <Button className="hidden md:inline-flex">
                  {ctaButton.text}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <Input
            placeholder="Buscar productos..."
            className="w-full pl-10 bg-gray-50 border-0"
          />
          <Search className="absolute left-7 top-[4.2rem] h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-4 py-3 border-t bg-white">
          <div className="space-y-3">
            <Link
              href="/categorias"
              className="block text-sm font-medium hover:text-primary"
            >
              Categorías
            </Link>
            <Link
              href="/productos"
              className="block text-sm font-medium hover:text-primary"
            >
              Productos
            </Link>
            <Link
              href="/servicios"
              className="block text-sm font-medium hover:text-primary"
            >
              Servicios
            </Link>
            <Link href={ctaButton.url}>
              <Button className="w-full mt-2">{ctaButton.text}</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
