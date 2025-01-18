// types/user.ts
import { Address } from "./address";
import { OrderItem } from "./orders";

export type UserType = "guest" | "authenticated";

export interface BaseUser {
  type: UserType;
  email: string;
  fullName: string;
}

export interface GuestUser extends BaseUser {
  type: "guest";
}

export interface AuthenticatedUser extends BaseUser {
  type: "authenticated";
  id: number;
  addresses: Address[];
  orders: OrderItem[];
}

export type User = GuestUser | AuthenticatedUser;
