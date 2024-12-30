import axios from "axios";
import { AuthResponse, UserAuthForm } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login(data: UserAuthForm) {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/local`,
        {
          identifier: data.email,
          password: data.password,
        }
      );
      return response.data;
    } catch {
      throw new Error("Credenciales inválidas");
    }
  },

  async register(data: UserAuthForm) {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/local/register`,
        {
          username: data.email,
          email: data.email,
          password: data.password,
        }
      );
      return response.data;
    } catch {
      throw new Error("Error al registrar usuario");
    }
  },

  async getMe(token: string) {
    try {
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch {
      throw new Error("Error al obtener información del usuario");
    }
  },
};
