// import { Logo } from "@/components/custom/logo";
// import Link from "next/link";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simplificado */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* <Link href="/">
            <Logo />
          </Link> */}
          <div className="text-sm text-muted-foreground">
            ¿Necesitas ayuda? Contáctanos
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
