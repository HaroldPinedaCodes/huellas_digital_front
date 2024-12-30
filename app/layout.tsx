import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/ui/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huellas Digital",
  description: "Tienda de productos para mascotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={cn(
            "relative h-full font-sans antialiased",
            `${geistSans.variable} ${geistMono.variable}`
          )}
        >
          <main className="relative flex flex-col min-h-screen bg-white">
            <Navbar />
            {/* <Navbar /> */}
            {children}
          </main>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
