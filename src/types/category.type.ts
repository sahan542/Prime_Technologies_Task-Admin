export type TCategory = {
  _id: string;
  title: string;
  slug: string;
  subCategories: TCategory[]; // Recursive type
};
