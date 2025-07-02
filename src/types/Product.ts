// src/types/Product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; 
  availability: 'inStock' | 'outOfStock' | 'backorder'; 
  description: string[];
  slug: string; 
}
