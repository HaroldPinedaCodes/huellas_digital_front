import Link from "next/link";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "../ui/input";

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

export async function Header({ data }: Readonly<HeaderProps>) {
  const { ctaButton } = data;

  console.log("Header data", data);
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={"Huella Digital"} />
      <div className="flex items-center gap-4">
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

        <Link href={ctaButton.url}>
          <Button>{ctaButton.text}</Button>
        </Link>
      </div>
    </div>
  );
}
