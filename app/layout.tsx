import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Header } from "@/components/custom/header";
import { ThemeProvider } from "next-themes";

import { Footer } from "@/components/custom/footer";
// import Navbar from "@/components/ui/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Huellas Digital",
//   description: "Tienda de productos para mascotas",
// };

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "Huellas Digital | Tienda de Mascotas",
    description:
      metadata?.data?.description ?? "Tienda de productos para mascotas",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  // console.dir(globalData, { depth: null });
  // console.log("globalData", globalData);

  return (
    <html
      className="dark:bg-gray-950 antialiased"
      lang="es"
      suppressHydrationWarning
    >
      <AuthProvider>
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            `${geistSans.variable} ${geistMono.variable}`
          )}
        >
          <ThemeProvider
            defaultTheme="system"
            disableTransitionOnChange
            attribute="class"
          >
            <main className="relative flex flex-col min-h-screen bg-white">
              <Header data={globalData.data.header} />
              <CartSheet />
              {/* <Navbar /> */}
              {children}
              <Footer data={globalData.data.footer} />
            </main>
          </ThemeProvider>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
