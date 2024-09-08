import { statusOrder } from "@/schema";

export type OrderBase = {
  quantity: number;
  status?: string; // Make status optional
  description?: string;
  price: number;
};
export type OrderFormType = {
  productName: string;
  client: string;
  orderId: number;
  userId: string;
} & OrderBase;

export type OrderUser = {
  user_id: string;
  user: {
    name: string | null; // Allow null here
    email: string | null; // Allow null here
  };
};
export type OrderType = {
  name: string | null | undefined; // Allow null here
  admin_id: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
} & OrderBase &
  OrderUser;
