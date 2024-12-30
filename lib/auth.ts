// lib/auth.ts
import axios from "axios";
import { UserAuthForm, AuthResponse } from "@/types/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login({ email, password }: UserAuthForm) {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/local`,
        {
          identifier: email,
          password,
        }
      );
      return response.data;
    } catch {
      throw new Error("Credenciales inválidas");
    }
  },

  async register({ email, password, username }: UserAuthForm) {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/local/register`,
        {
          username: username || email,
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error en el registro");
    }
  },
};
