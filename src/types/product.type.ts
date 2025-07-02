export type TProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  category: string;
  price: number;
  stock: number;
  discount: number | null;
  tags: string[];
  totalReviews: number;
  averageRatings: number;
  salesCount: number;
  isDeleted: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
};

export type TProductReview = {
  _id: string;
  username: string;
  email: string;
  product: TProduct;
  rating: number;
  review: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};




