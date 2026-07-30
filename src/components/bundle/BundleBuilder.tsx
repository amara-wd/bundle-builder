import { useEffect, useState } from "react";
import CameraIcon from "../../assets/icons/camera.png";
import PlanIcon from "../../assets/icons/plan.png";
import SensorsIcon from "../../assets/icons/sensors.png";
import ProtectionIcon from "../../assets/icons/protection.png";
import ArrowDown from "../../assets/icons/arrow-down.png";
import ArrowUp from "../../assets/icons/arrow-up.png";
import PlanCard from "../product/PlanCard";

import productsData from "../../data/products.json";
import {
  initialActiveVariants,
  initialSelections,
} from "../../data/initialState";
import type {
  ActiveVariants,
  BundleSelections,
  Product,
  BundleStep,
  ProductStep,
  PlanStep,
  Plan,
} from "../../types/bundle";
import ProductCard from "../product/ProductCard";
import QuantityStepper from "../ui/QuantityStepper";

const BundleBuilder = () => {
const [selections, setSelections] =
  useState<BundleSelections>(() => {
    const saved = localStorage.getItem("bundleSelections");

    return saved
      ? JSON.parse(saved)
      : initialSelections;
  });

const [activeVariants, setActiveVariants] =
  useState<ActiveVariants>(() => {
    const saved = localStorage.getItem("bundleVariants");

    return saved
      ? JSON.parse(saved)
      : initialActiveVariants;
  });

const [activeStep, setActiveStep] = useState<BundleStep["id"]>("cameras");
const [selectedPlanId, setSelectedPlanId] =
  useState<string | null>(() => {
    return (
      localStorage.getItem("bundlePlan") ??
      "cam-unlimited"
    );
  });
  const steps = productsData.steps as BundleStep[];

const stepIcons = {
  cameras: CameraIcon,
  plan: PlanIcon,
  sensors: SensorsIcon,
  protection: ProtectionIcon,
};

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

  const getProductQuantity = (product: Product) => {
    const productSelections = selections[product.id];

    if (!productSelections) {
      return 0;
    }

    if (product.variants.length > 0) {
      const activeVariant =
        activeVariants[product.id];

      return productSelections[activeVariant] ?? 0;
    }

    return productSelections.default ?? 0;
  };
const hardwareTotal = steps.reduce((total, step) => {
  if (step.id === "plan") return total;

  return (
    total +
    step.products.reduce((stepTotal, product) => {
      const quantity = getProductQuantity(product);

      return stepTotal + quantity * product.price;
    }, 0)
  );
}, 0);

const compareTotal = steps.reduce((total, step) => {
  if (step.id === "plan") return total;

  return (
    total +
    step.products.reduce((stepTotal, product) => {
      const quantity = getProductQuantity(product);

      const comparePrice =
        product.compareAtPrice ?? product.price;

      return stepTotal + quantity * comparePrice;
    }, 0)
  );
}, 0);
const savings = compareTotal - hardwareTotal;
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
  selectedPlan?.monthlyPrice ?? 0;
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
  localStorage.setItem(
    "bundleSelections",
    JSON.stringify(selections)
  );

  localStorage.setItem(
    "bundleVariants",
    JSON.stringify(activeVariants)
  );

  localStorage.setItem(
    "bundlePlan",
    selectedPlanId ?? ""
  );
}, [
  selections,
  activeVariants,
  selectedPlanId,
]);
const nextStep =
  currentIndex < stepOrder.length - 1
    ? steps.find(
        (step) =>
          step.id === stepOrder[currentIndex + 1]
      )
    : null;
    const grandTotal = hardwareTotal + monthlyPlanPrice;
  return (
 <main className="min-h-screen bg-white">
  <div className="mx-auto flex w-full max-w-[1196px] flex-col gap-6 py-[49px] lg:flex-row lg:items-start lg:gap-[29px]">  {/* LEFT - BUILDER */}
<section className="w-full lg:w-[768px]">
         <div className="flex flex-col gap-[13px]">
            {steps.map((step) => {
              
              const isOpen =
                activeStep === step.id;
           const selectedCount =
  step.id === "plan"
    ? selectedPlanId
      ? 1
      : 0
    : step.products.filter(
        (product) => getProductQuantity(product) > 0
      ).length;
const Icon =
  stepIcons[step.id as keyof typeof stepIcons];
              return (
               <div
  key={step.id}
 className={`overflow-hidden rounded-[10px] border border-[#D8DCE8]
${
isOpen
?
"bg-[#EDF4FF]"
:
"bg-white"
}`}
>
                  {/* Step Header */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                  <div>
    <p className="text-[10px] uppercase tracking-[1px] text-[#8A8A8A]">
        STEP {step.stepNumber} OF 4
    </p>

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
  src={isOpen ? ArrowUp : ArrowDown}
  alt=""
/>
</div>
                  </button>

                  {/* Step Content */}
                  {isOpen && (
  <div className="border-t border-slate-200 bg-slate-100 p-4">
    {step.id === "plan" ? (
  <div className="grid gap-4">
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
        quantity={getProductQuantity(product)}
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
    <button
      type="button"
      onClick={goToNextStep}
      className="rounded-lg bg-[#4E2FD2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3e22b3]"
    >
      Next: {nextStep?.title}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => alert("Configuration ready for checkout!")}
      className="rounded-lg bg-[#4E2FD2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3e22b3]"
    >
      Checkout
    </button>
  )}
</div>
  </div>
)}
                </div>
              );
            })}
          </div>
        </section>

        {/* RIGHT - REVIEW */}
      <aside className="w-full rounded-[10px] bg-[#EDF4FF] px-5 py-[15px] lg:w-[399px]">
          <h2 className="text-xl font-semibold text-slate-900">
            Your security system
          </h2>

          <p className="mt-2 text-sm text-slate-600">
           Review your personalized protection system designed to keep what matters most safe.
          </p>

          <div className="mt-6 space-y-4">
          {reviewSteps.map((step) => {

  if (step.id === "plan") {
  if (!selectedPlan) return null;

  return (
    <div key={step.id}>
      <h3 className="mb-2 text-xs font-medium uppercase text-slate-400">
        {step.reviewCategory}
      </h3>

      <div className="flex items-center justify-between rounded-lg bg-white p-3">
        <div>
          <p className="text-sm font-semibold">
            {selectedPlan.name}
          </p>

          <p className="text-xs text-slate-500">
            Subscription Plan
          </p>
        </div>

        <div className="text-right">
          {selectedPlan.compareMonthlyPrice && (
            <p className="text-[10px] text-[#9A9A9A] line-through">
              ${selectedPlan.compareMonthlyPrice.toFixed(2)}/mo
            </p>
          )}

          <p className="text-sm font-semibold text-[#4E2FD2]">
            ${selectedPlan.monthlyPrice.toFixed(2)}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
const productStep = step as ProductStep;

const reviewItems = productStep.products.flatMap((product) => {
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
    <h3 className="mb-2 text-xs font-medium uppercase text-slate-400">
      {step.reviewCategory}
    </h3>

    <div className="space-y-2">
      {reviewItems.map((item) => {
  const { product, variant, quantity, variantId } = item;

  return (
        <div
          key={`${product.id}-${variantId}`}
          className="grid grid-cols-[1fr_auto_60px] items-center gap-3"
        >
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={product.image}
              alt=""
              className="h-10 w-10 rounded bg-white object-contain"
            />

           <div className="min-w-0">
  <p className="truncate text-xs font-medium">
    {product.name}
  </p>

  {variant && (
    <p className="text-[11px] text-slate-500">
      {variant.name}
    </p>
  )}
</div>
          </div>

          <div className="flex justify-center">
            <QuantityStepper
              size="sm"
              quantity={quantity}
             onDecrease={() =>
  updateQuantity(
    product.id,
    variantId,
    quantity - 1
  )
}

onIncrease={() =>
  updateQuantity(
    product.id,
    variantId,
    quantity + 1
  )
}
            />
          </div>

          <div className="w-[60px] text-right">
            {product.compareAtPrice && (
              <p className="text-[10px] text-[#9A9A9A] line-through">
                $
                {(
                  product.compareAtPrice *
                  quantity
                ).toFixed(2)}
              </p>
            )}

            <p className="text-[12px] font-semibold text-[#4E2FD2]">
              $
              {(
                product.price *
                quantity
              ).toFixed(2)}
            </p>
          </div>
        </div>
      )})}
    </div>
  </div>
);
})}
          </div>

       <div className="mt-6 border-t border-blue-200 pt-4">

  <div className="flex justify-between text-sm">
    <span>Shipping</span>
    <span>FREE</span>
  </div>

  {selectedPlan && (
    <div className="mt-3 flex justify-between text-sm">
      <span>Plan</span>

      <span className="font-medium text-[#4E2FD2]">
        ${monthlyPlanPrice.toFixed(2)}/mo
      </span>
    </div>
  )}

  <div className="mt-5 flex justify-between items-end">

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

</div>
        </aside>
      </div>
    </main>
  );
};

export default BundleBuilder;