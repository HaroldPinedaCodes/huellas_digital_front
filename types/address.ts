export interface Address {
  id?: number; // Opcional porque las nuevas direcciones no tienen ID
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}
