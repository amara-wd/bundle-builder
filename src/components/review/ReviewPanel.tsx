
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
          <h2 className="text-xl font-semibold text-slate-900">
            Your security system
          </h2>

          <p className="mt-2 text-sm text-slate-600">
           Review your personalized protection system designed to keep what matters most safe.
          </p>

          <div className="mt-6 space-y-4">
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

       <div className="mt-6 border-t border-blue-200 pt-4">

 <div className="flex items-center justify-between text-sm">
  <div className="flex items-center gap-2">
    <img
      src={ShippingIcon}
      alt="Fast Shipping"
      className=" object-contain"
    />

    <span className="font-medium text-[#111827]">
      Fast Shipping
    </span>
  </div>

  <span className="font-semibold">
    FREE
  </span>
</div>


  <div className="flex items-start gap-3">
   
   <div className="mt-5 flex items-center gap-4">
  <img
    src={GuaranteeBadge}
    alt="30-Day Satisfaction Guarantee"
    className="h-16 w-16 object-contain"
  />

  <div>
    <p className="text-sm font-semibold text-[#111827]">
      30-Day Satisfaction Guarantee
    </p>

    <p className="text-xs text-[#6B7280]">
      Shop with confidence.
    </p>
  </div>
</div>
  </div>

<div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3">
  <div>
    <p className="text-sm font-medium">
      Financing Available
    </p>

    <p className="text-xs text-slate-500">
      Starting at ${(grandTotal / 12).toFixed(2)}/mo
    </p>
  </div>

  <span className="rounded-full bg-[#EDF4FF] px-3 py-1 text-xs font-medium text-[#4E2FD2]">
    0% APR
  </span>
</div>
 <div className="mt-6 border-t border-[#D8DCE8] pt-5">
  <div className="flex items-end justify-between">

    <div>
      {compareTotal > hardwareTotal && (
        <p className="text-xs text-[#9A9A9A] line-through">
          ${compareTotal.toFixed(2)}
        </p>
      )}

      <p className="text-xl font-bold">
  ${grandTotal.toFixed(2)}
</p>
    </div>

    {savings > 0 && (
      <span className="rounded-full bg-[#E7F8ED] px-3 py-1 text-xs font-semibold text-[#15803D]">
        You save ${savings.toFixed(2)}
      </span>
    )}
    

  </div>
  <button  onClick={onCheckout}
  className="mt-4 w-full rounded-lg bg-[#4E2FD2] py-4 text-lg font-semibold text-white transition hover:bg-[#3e22b3]"
>
  Checkout
</button>
 
   </div>
  <button
onClick={onSave}
  className="mt-4 w-full text-center text-sm font-medium text-[#4E2FD2] hover:underline"
>
  Save my system for later
</button>
</div>
        </aside>
        );
};

export default ReviewPanel;