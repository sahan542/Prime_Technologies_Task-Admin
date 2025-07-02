export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isDeleted: boolean;
  __v: number;
};

export type TResponseUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  exp: number;
  iat: number;
};
