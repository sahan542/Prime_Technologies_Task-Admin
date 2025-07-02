import { TProduct } from "./product.type";

export type TOrderItem = {
  _id: string;
  product: TProduct;
  quantity: number;
};

export type TOrder = {
  _id: string;
  orderNumber: string;
  fullName: string;
  fullAddress: string;
  phoneNo: string;
  email: string;
  country: string;
  orderNotes: string;
  insideDhaka: boolean;
  orderItems: TOrderItem[];
  totalPrice: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentMethod: "CASH-ON-DELIVERY" | "DIGITAL-PAYMENT";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
