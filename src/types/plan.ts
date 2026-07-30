export type ProductVariant = {
  id: string;
  name: string;
  swatch?: string;
  image?: string;
};

export type Product = {
  id: string;
  category: "cameras" | "sensors" | "protection";
  name: string;
  description?: string;
  image: string;

  price: number;
  compareAtPrice?: number;

  discount?: string;
  learnMore?: boolean;

  variants: ProductVariant[];
};

export type Plan = {
  id: string;
  category: "plan";

  name: string;
  description?: string;
  image: string;

  monthlyPrice: number;
  compareMonthlyPrice?: number;

  billingPeriod: "month" | "year";

  learnMore?: boolean;
};