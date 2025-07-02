export type MenuItem = {
  title: string;
  categories: { label: string; href: string }[]; 
  images: string[]; 
};

export const menuData: Record<string, MenuItem> = {
  "SKIN CARE": {
    title: "Skin Care",
    categories: [
      { label: "Cleansers", href: "/skin-care/cleansers" },
      { label: "Moisturizers", href: "/skin-care/moisturizers" },
      { label: "Serums", href: "/skin-care/serums" },
      { label: "Toners", href: "/skin-care/toners" },
      { label: "Sunscreens", href: "/skin-care/sunscreens" },
      { label: "Eye & Lip Care", href: "/skin-care/eye-lip-care" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/skin1.jpg",
      "/assets/skin2.jpg",
    ],
  },
  "MOISTURIZORS": {
    title: "Moisturizers",
    categories: [
      { label: "Creams", href: "/moisturizers/creams" },
      { label: "Lotions", href: "/moisturizers/lotions" },
      { label: "Hydrating Gel", href: "/moisturizers/hydrating-gel" },
    ],
    images: [
      "/cour-1.jpg"
    ],
  },
  "CLEANSERS": {
    title: "Cleansers",
    categories: [
      { label: "Gel Cleanser", href: "/cleansers/gel" },
      { label: "Oil Cleanser", href: "/cleansers/oil" },
      { label: "Foam Cleanser", href: "/cleansers/foam" },
      { label: "Micellar Water", href: "/cleansers/micellar-water" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/cleanser1.jpg",
    ],
  },
  "SERUMS": {
    title: "Serums",
    categories: [
      { label: "Vitamin C Serum", href: "/serums/vitamin-c" },
      { label: "Hyaluronic Acid Serum", href: "/serums/hyaluronic-acid" },
      { label: "Niacinamide Serum", href: "/serums/niacinamide" },
      { label: "Retinol Serum", href: "/serums/retinol" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/serum1.jpg",
    ],
  },
  "TONERS": {
    title: "Toners",
    categories: [
      { label: "Exfoliating Toner", href: "/toners/exfoliating" },
      { label: "Hydrating Toner", href: "/toners/hydrating" },
      { label: "Astringent Toner", href: "/toners/astringent" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/toner1.jpg",
    ],
  },
  "SUNSCREENS": {
    title: "Sunscreens",
    categories: [
      { label: "Mineral Sunscreen", href: "/sunscreens/mineral" },
      { label: "Chemical Sunscreen", href: "/sunscreens/chemical" },
      { label: "Tinted Sunscreen", href: "/sunscreens/tinted" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/sunscreen1.jpg",
    ],
  },
  "EYE & LIP CARE": {
    title: "Eye & Lip Care",
    categories: [
      { label: "Eye Cream", href: "/eye-lip-care/eye-cream" },
      { label: "Lip Balm", href: "/eye-lip-care/lip-balm" },
      { label: "Eye Serum", href: "/eye-lip-care/eye-serum" },
    ],
    images: [
      "https://res.cloudinary.com/dtzx6gxfh/image/upload/v1749847983/Vanilla-1_kmbj2y.webp",
      "/assets/eye-lip-care1.jpg",
    ],
  },
};

