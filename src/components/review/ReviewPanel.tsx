
import ShippingIcon from "../../assets/icons/shipping.png";
import GuaranteeBadge from "../../assets/icons/guarantee-badge.png";

import type {
  ActiveVariants,
  BundleSelections,
  BundleStep,
  Plan,
} from "../../types/bundle";
import ReviewSection from "./ReviewSection";

interface ReviewPanelProps {
  reviewSteps: BundleStep[];
  selections: BundleSelections;
  activeVariants: ActiveVariants;

  selectedPlan: Plan | undefined;

  hardwareTotal: number;
  compareTotal: number;
  savings: number;
  grandTotal: number;
  monthlyPlanPrice: number;

  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;

  onCheckout: () => void;
  onSave: () => void;
}

const ReviewPanel = ({
  reviewSteps,
  selections,
  activeVariants,
  selectedPlan,
  hardwareTotal,
  compareTotal,
  savings,
  grandTotal,
  updateQuantity,
  onCheckout,
  onSave,
}: ReviewPanelProps) => {
    
  return (
  <aside className="w-full rounded-[10px] bg-[#EDF4FF] px-5 py-3.75 lg:w-99.75">
     {/* <h2 className="text-xl text-slate-600">
            Review
          </h2> */}

          <h2 className="text-xl font-semibold text-slate-900">
            Your security system
          </h2>

          <p className="mt-2 text-sm text-slate-600">
           Review your personalized protection system designed to keep what matters most safe.
          </p>

          <div className="mt-6 space-y-4 ">
       {reviewSteps.map((step) => (
  <ReviewSection
    key={step.id}
    step={step}
    selections={selections}
    activeVariants={activeVariants}
    selectedPlan={selectedPlan}
    updateQuantity={updateQuantity}
  />
))}
          </div>

       <div className="mt-2 border-t border-[#CED6DE] pt-4">

 <div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <img
      src={ShippingIcon}
      alt="Fast Shipping"
      className=" object-contain"
    />

    <span className="text-[12px] md:text-[14px]  font-medium  text-[#111827]">
      Fast Shipping
    </span>
  </div>

  <div className="text-right leading-tight">
    <p className="text-[12px] md:text-[14px] text-[#6F7882] line-through">
      $5.99
    </p>

    <p className="text-[12px] md:text-[14px] font-semibold text-[#5B39E6]">
      FREE
    </p>
  </div>
</div>

{/* Badge + Total */}
<div className="mt-5 flex items-start justify-between">
  <img
    src={GuaranteeBadge}
    alt="100% Satisfaction Guarantee"
    className="h-20 w-20 object-contain"
  />

  <div className="text-right">
    <span className="rounded bg-[#5B39E6] px-2 py-1 text-[12px] font-medium text-white">
      as low as ${(grandTotal / 12).toFixed(2)}/mo
    </span>
<div className="mt-2 flex items-end justify-end gap-2">
  {compareTotal > hardwareTotal && (
    <p className="text-md  text-[14px] md:text-[18px] font-medium text-[#6F7882] line-through">
      ${compareTotal.toFixed(2)}
    </p>
  )}

  <p className="text-[20px] md:text-[24px] font-bold text-[#4E2FD2]">
    ${grandTotal.toFixed(2)}
  </p>
</div>
  </div>
</div>

{/* Savings */}
{savings > 0 && (
  <div className="mt-4 text-center">
    <p className="text-[12px] font-semibold text-[#00A884]">
      Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
    </p>
  </div>
)}

{/* Checkout */}
<button
  onClick={onCheckout}
  className="w-full rounded-md bg-[#4E2FD2] py-2  text-[15px] md:text-[17px] font-semibold text-white transition hover:bg-[#3E22B3]"
>
  Checkout
</button>

{/* Save */}
<button
  onClick={onSave}
  className="mt-1 w-full text-center  text-[12px] md:text-[14px]  italic text-[#666666] underline"
>
  Save my system for later
</button>
</div>
        </aside>
        );
};

export default ReviewPanel;