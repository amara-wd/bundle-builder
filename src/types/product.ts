export type ProductVariant = {
  id: string;
  name: string;
  swatch?: string;
  image?: string;
};

export type Product = {
  id: string;
  category: "cameras" | "plan" | "sensors" | "protection";
  name: string;
  description?: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  discount?: string;
  learnMore?: boolean;
  billingPeriod?: string;
  variants?: ProductVariant[];
};

export type BundleStep = {
  id: "cameras" | "plan" | "sensors" | "protection";
  stepNumber: number;
  title: string;
  reviewCategory: "Cameras" | "Plan" | "Sensors" | "Accessories";
  products: Product[];
};