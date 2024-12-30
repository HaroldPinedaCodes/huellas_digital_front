// contexts/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import { toast } from "sonner";

interface User {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Implementa el endpoint para verificar el token en Strapi
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("token", response.jwt);
      setUser(response.user);
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch (error) {
      toast.error("Credenciales inválidas");
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await authService.register({
        email,
        password,
        username,
      });
      console.log(response);
      toast.success("Registro exitoso");
      router.push("/login");
    } catch (error) {
      toast.error("Error en el registro");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
    toast.success("Sesión cerrada");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
