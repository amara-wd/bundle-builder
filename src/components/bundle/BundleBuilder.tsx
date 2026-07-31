import { useEffect, useState } from "react";
import CameraIcon from "../../assets/icons/camera.png";
import PlanIcon from "../../assets/icons/plan.png";
import SensorsIcon from "../../assets/icons/sensors.png";
import ProtectionIcon from "../../assets/icons/protection.png";
import ArrowDown from "../../assets/icons/arrow-down.png";
import ArrowUp from "../../assets/icons/arrow-up.png";
import PlanCard from "../product/PlanCard";
import CheckoutModal from "../modal/CheckoutModal";
import SaveModal from "../modal/SaveModal";
import {
  getProductQuantity,
  getHardwareTotal,
  getCompareTotal,
  getSavings,
  getGrandTotal,
  getMonthlyPlanPrice,
} from "../../utils/bundleCalculations";
import {
  loadSelections,
  saveSelections,
  loadVariants,
  saveVariants,
  loadPlan,
  savePlan,
} from "../../utils/storage";
import productsData from "../../data/products.json";
import type {
  ActiveVariants,
  BundleSelections,
  BundleStep,
  PlanStep,
} from "../../types/bundle";
import ProductCard from "../product/ProductCard";
import ReviewPanel from "../review/ReviewPanel";

const BundleBuilder = () => {
const [selections, setSelections] =
  useState<BundleSelections>(loadSelections);

const [activeVariants, setActiveVariants] =
  useState<ActiveVariants>(loadVariants);

const [activeStep, setActiveStep] = useState<BundleStep["id"]>("cameras");
const [selectedPlanId, setSelectedPlanId] =
  useState<string | null>(loadPlan);
  const steps = productsData.steps as BundleStep[];
const [showCheckoutModal, setShowCheckoutModal] =
  useState(false);
const stepIcons = {
  cameras: CameraIcon,
  plan: PlanIcon,
  sensors: SensorsIcon,
  protection: ProtectionIcon,
};
const [showSaveModal, setShowSaveModal] = useState(false);

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setSelections((previousSelections) => ({
      ...previousSelections,

      [productId]: {
        ...previousSelections[productId],
        [variantId]: Math.max(0, quantity),
      },
    }));
  };

  const updateActiveVariant = (
    productId: string,
    variantId: string
  ) => {
    setActiveVariants((previousVariants) => ({
      ...previousVariants,
      [productId]: variantId,
    }));
  };

 
const hardwareTotal = getHardwareTotal(
  steps,
  selections,
  activeVariants
);

const compareTotal = getCompareTotal(
  steps,
  selections,
  activeVariants
);
const savings = getSavings(
  compareTotal,
  hardwareTotal
);
  const reviewSteps = [
  ...steps.filter(step => step.id !== "plan"),
  ...steps.filter(step => step.id === "plan"),
];
const planStep = steps.find(
  (step): step is PlanStep => step.id === "plan"
);

const selectedPlan = planStep?.plans.find(
  (plan) => plan.id === selectedPlanId
);
const monthlyPlanPrice =
  getMonthlyPlanPrice(selectedPlan);
  const stepOrder: BundleStep["id"][] = [
  "cameras",
  "plan",
  "sensors",
  "protection",
];
const goToNextStep = () => {
  const currentIndex = stepOrder.indexOf(activeStep);

  if (currentIndex < stepOrder.length - 1) {
    setActiveStep(stepOrder[currentIndex + 1]);
  }
};
const currentIndex = stepOrder.indexOf(activeStep);


useEffect(() => {
  saveSelections(selections);
}, [selections]);
useEffect(() => {
  saveVariants(activeVariants);
}, [activeVariants]);
useEffect(() => {
  if (selectedPlanId) {
    savePlan(selectedPlanId);
  }
}, [selectedPlanId]);
const nextStep =
  currentIndex < stepOrder.length - 1
    ? steps.find(
        (step) =>
          step.id === stepOrder[currentIndex + 1]
      )
    : null;
   const grandTotal = getGrandTotal(hardwareTotal);
  return (
 <main className="min-h-screen bg-white">
  <div className="mx-auto flex w-full max-w-299 flex-col gap-6 py-12.25 lg:flex-row lg:items-start lg:gap-7.25">  {/* LEFT - BUILDER */}
<section className="w-full lg:w-3xl">
         <div className="flex flex-col gap-3.25">
            {steps.map((step) => {
              
              const isOpen =
                activeStep === step.id;
           const selectedCount =
  step.id === "plan"
    ? selectedPlanId
      ? 1
      : 0
    : step.products.filter(
        (product) => getProductQuantity(
  product,
  selections,
  activeVariants
) > 0
      ).length;
const Icon =
  stepIcons[step.id as keyof typeof stepIcons];
              return (
                <>    <div
  key={step.id}
 className={`overflow-hidden  rounded-lg pt-2
${
isOpen
?
"bg-[#EDF4FF]"
:
"bg-white"
}`}
>
  <div className=" border-b border-[#5c5959]">
  <p className="text-[10px] ml-5 uppercase tracking-[1px] text-[#8A8A8A]">
        STEP {step.stepNumber} OF 4
    </p>
        </div>    
                  {/* Step Header */}
                  <button
                    type="button"
                   onClick={() =>
  setActiveStep((currentStep) =>
    currentStep === step.id ? null : step.id
  )
}

                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                  <div>
   

    <div className="mt-1 flex items-center gap-2">



<div className="flex items-center gap-2">
  <img
    src={Icon}
    alt={step.title}
    className="h-5 w-5 object-contain"
  />

  <h2 className="text-[20px] font-semibold">
    {step.title}
  </h2>
</div>

    </div>
</div>

                 <div className="flex items-center gap-2">
  {isOpen && (
  <span className="text-[13px] font-medium text-[#6D4AFF]">
    {selectedCount} selected
  </span>
)}

  <img
  src={isOpen ? ArrowDown : ArrowUp}
  alt=""
/>
</div>
                  </button>

                  {/* Step Content */}
                  {isOpen && (
  <div className="border-t border-slate-200 bg-[#EDF4FF] p-4">
    {step.id === "plan" ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {(step as PlanStep).plans.map((plan) => (
    <PlanCard
      key={plan.id}
      plan={plan}
      selected={selectedPlanId === plan.id}
      onSelect={() => setSelectedPlanId(plan.id)}
    />
  ))}
</div>
) : (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {step.products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        activeVariant={activeVariants[product.id]}
        quantity={getProductQuantity(
  product,
  selections,
  activeVariants
)}
        onVariantChange={(variantId) =>
          updateActiveVariant(product.id, variantId)
        }
       onQuantityChange={(newQuantity) => {
  const currentVariantId =
    product.variants.length > 0
      ? activeVariants[product.id]
      : "default";

  updateQuantity(
    product.id,
    currentVariantId,
    newQuantity
  );
}}
      />
    ))}
  </div>
)}
    {/* Next Button */}
   <div className="mt-6 flex justify-center">
  {step.stepNumber < 4 ? (
   <div className="mt-6 flex justify-center">
  <button
    type="button"
    onClick={goToNextStep}
    className="
      min-w-55
      rounded-lg
      border
      border-[#4E2FD2]
     
      px-4
      py-2
      text-[16px]
      font-semibold
      text-[#4E2FD2]
      transition-all
      duration-200
      hover:bg-[#4E2FD2]
      hover:text-white
    "
  >
    Next: {nextStep?.title}
  </button>
</div>
  ) : (
    <button
      type="button"
      onClick={() => setShowCheckoutModal(true)}
      className="rounded-lg bg-[#4E2FD2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3e22b3]"
    >
      Checkout
    </button>
  )}
</div>
  </div>
)}
<div className="border-b border-[#5c5959]"></div>
                </div>
                </>
              );
            })}
          </div>
        </section>

        {/* RIGHT - REVIEW */}
  <ReviewPanel
  reviewSteps={reviewSteps}
  selections={selections}
  activeVariants={activeVariants}
  selectedPlan={selectedPlan}
  hardwareTotal={hardwareTotal}
  compareTotal={compareTotal}
  savings={savings}
  grandTotal={grandTotal}
  monthlyPlanPrice={monthlyPlanPrice}
  updateQuantity={updateQuantity}
  onCheckout={() => setShowCheckoutModal(true)}
  onSave={() => setShowSaveModal(true)}
/>
      </div>
     <CheckoutModal
  open={showCheckoutModal}
  onClose={() => setShowCheckoutModal(false)}
  hardwareTotal={hardwareTotal}
  grandTotal={grandTotal}
  monthlyPlanPrice={monthlyPlanPrice}
  selectedPlan={selectedPlan}
/>

<SaveModal
  open={showSaveModal}
  onClose={() => setShowSaveModal(false)}
  hardwareTotal={hardwareTotal}
  grandTotal={grandTotal}
  monthlyPlanPrice={monthlyPlanPrice}
  selectedPlan={selectedPlan}
/>
    </main>
  );
};

export default BundleBuilder;