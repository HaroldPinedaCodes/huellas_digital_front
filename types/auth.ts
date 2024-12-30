// types/auth.ts
export interface UserAuthForm {
  email: string;
  password: string;
  username?: string;
}

export interface UserRole {
  id: number;
  name: string;
  description?: string;
  type?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  role: UserRole;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface AuthState {
  zodErrors?: {
    username?: string[];
    password?: string[];
    email?: string[];
  };
  strapiErrors?: {
    username?: string[];
    password?: string[];
    email?: string[];
    message?: string;
  } | null;
  message?: string;
  status: "idle" | "loading" | "success" | "error";
  data?: {
    user?: User;
    jwt?: string;
  } | null;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export type AuthActionState = Omit<AuthState, "status">;
