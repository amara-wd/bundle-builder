import type {
  BundleSelections,
  ActiveVariants,
  BundleStep,
  Product,
  Plan,
} from "../types/bundle";

export const getProductQuantity = (
  product: Product,
  selections: BundleSelections,
  activeVariants: ActiveVariants
) => {
  const productSelections = selections[product.id];

  if (!productSelections) {
    return 0;
  }

  if (product.variants.length > 0) {
    const activeVariant = activeVariants[product.id];

    return productSelections[activeVariant] ?? 0;
  }

  return productSelections.default ?? 0;
};

export const getHardwareTotal = (
  steps: BundleStep[],
  selections: BundleSelections,
  activeVariants: ActiveVariants
) => {
  return steps.reduce((total, step) => {
    if (step.id === "plan") return total;

    return (
      total +
      step.products.reduce((stepTotal, product) => {
        const quantity = getProductQuantity(
          product,
          selections,
          activeVariants
        );

        return stepTotal + quantity * product.price;
      }, 0)
    );
  }, 0);
};

export const getCompareTotal = (
  steps: BundleStep[],
  selections: BundleSelections,
  activeVariants: ActiveVariants
) => {
  return steps.reduce((total, step) => {
    if (step.id === "plan") return total;

    return (
      total +
      step.products.reduce((stepTotal, product) => {
        const quantity = getProductQuantity(
          product,
          selections,
          activeVariants
        );

        const comparePrice =
          product.compareAtPrice ?? product.price;

        return stepTotal + quantity * comparePrice;
      }, 0)
    );
  }, 0);
};

export const getMonthlyPlanPrice = (
  selectedPlan?: Plan
) => {
  return selectedPlan?.monthlyPrice ?? 0;
};

export const getSavings = (
  compareTotal: number,
  hardwareTotal: number
) => compareTotal - hardwareTotal;

export const getGrandTotal = (
  hardwareTotal: number,
  monthlyPlanPrice: number
) => hardwareTotal + monthlyPlanPrice;