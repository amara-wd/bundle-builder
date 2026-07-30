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
  name: string;
  description: string;

  monthlyPrice: number;
  compareMonthlyPrice?: number;

  badge?: string;

  features: string[];
};

export type ProductStep = {
  id: "cameras" | "sensors" | "protection";

  stepNumber: number;
  title: string;

  reviewCategory:
    | "Cameras"
    | "Sensors"
    | "Accessories";

  products: Product[];
};

export type PlanStep = {
  id: "plan";

  stepNumber: number;
  title: string;

  reviewCategory: "Plan";

  plans: Plan[];
};

export type BundleStep = ProductStep | PlanStep;

export type BundleSelections = Record<
  string,
  Record<string, number>
>;

export type ActiveVariants = Record<
  string,
  string
>;