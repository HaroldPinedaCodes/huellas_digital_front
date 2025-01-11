import { z } from "zod";

export const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Nombre de usuario debe tener entre 3 y 20 caracteres",
  }),
  password: z.string().min(6).max(100, {
    message: "Contraseña debe tener entre 6 y 100 caracteres",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido",
  }),
});
