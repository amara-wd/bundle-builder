export type ProductVariant = {
  id: string;
  name: string;
  swatch?: string;
  image?: string;
};

export type Product = {
  id: string;
  category: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  discount?: string;
  learnMore?: boolean;
  billingPeriod?: string;
  variants: ProductVariant[];
};
export type BundleStep = {
  id:
    | "cameras"
    | "plan"
    | "sensors"
    | "protection";
  stepNumber: number;
  title: string;
  reviewCategory:
    | "Cameras"
    | "Plan"
    | "Sensors"
    | "Accessories";
  products: Product[];
};

export type BundleSelections = Record<
  string,
  Record<string, number>
>;

export type ActiveVariants = Record<
  string,
  string
>;