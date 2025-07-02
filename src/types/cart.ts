// types/cart.ts
// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   img: string;
// }

export interface CartItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  slug: string; 
}