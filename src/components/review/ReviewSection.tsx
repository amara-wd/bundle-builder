import type {
  ActiveVariants,
  BundleSelections,
  BundleStep,
  Plan,
  ProductStep,
  ProductVariant,
} from "../../types/bundle";
 import PlanLogo from "../../assets/icons/bagde.png";
import ReviewItem from "./ReviewItem";
interface ReviewSectionProps {
  step: BundleStep;
  selections: BundleSelections;
  activeVariants: ActiveVariants;
  selectedPlan?: Plan;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
}
type ReviewItemData = {
  product: ProductStep["products"][number];
  variant: ProductVariant | null;
  quantity: number;
  variantId: string;
};
const ReviewSection = ({
  step,
  selections,
  selectedPlan,
  updateQuantity,
}: ReviewSectionProps) => {
  
  if (step.id === "plan") {
  if (!selectedPlan) return null;

  return (
    <div key={step.id}>
      <h3 className="text-[12px] pt-2 font-light uppercase  text-[#A8B2BD] border-t border-[#CED6DE]">
        {step.reviewCategory}
      </h3>

      <div className="flex items-center justify-between ">
  <div className="flex items-center gap-3 ">
    <img
      src={PlanLogo}
      alt={selectedPlan.name}
      className=" object-contain"
    />

      <p className="text-[14px] font-semibold text-[#0B0D10]">
        {selectedPlan.name}
      </p>

  </div>

  <div className="text-right">
    {selectedPlan.compareMonthlyPrice && (
      <p className="text-[14px] text-[#6F7882] line-through">
        ${selectedPlan.compareMonthlyPrice.toFixed(2)}/mo
      </p>
    )}

    <p className="text-[14px] font-semibold text-[#4E2FD2]">
      ${selectedPlan.monthlyPrice.toFixed(2)}/mo
    </p>
  </div>
</div>
    </div>
  );
}
const productStep = step as ProductStep;

const reviewItems: ReviewItemData[] =
  productStep.products.flatMap<ReviewItemData>((product) => {
  // Products with variants
  if (product.variants.length > 0) {
    return product.variants
      .map((variant) => {
        const quantity =
          selections[product.id]?.[variant.id] ?? 0;

        return {
          product,
          variant,
          quantity,
          variantId: variant.id,
        };
      })
      .filter((item) => item.quantity > 0);
  }

  // Products without variants
  const quantity =
    selections[product.id]?.default ?? 0;

  return quantity > 0
    ? [
        {
          product,
          variant: null,
          quantity,
          variantId: "default",
        },
      ]
    : [];
});


 if (reviewItems.length === 0){
    return null;
  }

 return (
  <div key={step.id}>
    <h3 className="mb-2 pt-2  text-xs font-light uppercase text-[#A8B2BD] border-t border-[#CED6DE]">
      {step.reviewCategory}
    </h3>

    <div className="space-y-2">
      {reviewItems.map((item) => {
  const { product, variant, quantity, variantId } = item;

  return (
    <ReviewItem
      key={`${product.id}-${variantId}`}
      product={product}
      variant={variant}
      quantity={quantity}
      variantId={variantId}
      updateQuantity={updateQuantity}
    />
  );
})}
    </div>
  </div>
);
};

export default ReviewSection;