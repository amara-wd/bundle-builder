import { useState } from "react";
import CameraIcon from "../../assets/icons/camera.png";
import PlanIcon from "../../assets/icons/plan.png";
import SensorsIcon from "../../assets/icons/sensors.png";
import ProtectionIcon from "../../assets/icons/protection.png";
import ArrowDown from "../../assets/icons/arrow-down.png";
import ArrowUp from "../../assets/icons/arrow-up.png";

import productsData from "../../data/products.json";
import {
  initialActiveVariants,
  initialSelections,
} from "../../data/initialState";
import type {
  ActiveVariants,
  BundleSelections,
  Product,
} from "../../types/bundle";
import ProductCard from "../product/ProductCard";
import QuantityStepper from "../ui/QuantityStepper";

const BundleBuilder = () => {
  const [selections, setSelections] =
    useState<BundleSelections>(initialSelections);

  const [activeVariants, setActiveVariants] =
    useState<ActiveVariants>(initialActiveVariants);

  const [activeStep, setActiveStep] = useState("cameras");

  const steps = productsData.steps;

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

  const reviewSteps = [
  ...steps.filter(step => step.id !== "plan"),
  ...steps.filter(step => step.id === "plan"),
];
  return (
 <main className="min-h-screen bg-white">
  <div className="mx-auto flex w-full max-w-[1196px] flex-col gap-6 py-[49px] lg:flex-row lg:items-start lg:gap-[29px]">  {/* LEFT - BUILDER */}
<section className="w-full lg:w-[768px]">
         <div className="flex flex-col gap-[13px]">
            {steps.map((step) => {
              
              const isOpen =
                activeStep === step.id;
                const selectedCount = step.products.filter(
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
                    onClick={() =>
                      setActiveStep(
                        isOpen ? "" : step.id
                      )
                    }
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
    {step.products.length > 0 ? (
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
            onQuantityChange={(quantity) => {
              const variantId =
                product.variants.length > 0
                  ? activeVariants[product.id]
                  : "default";

              updateQuantity(
                product.id,
                variantId,
                quantity
              );
            }}
          />
        ))}
      </div>
    ) : (
      <p className="py-8 text-center text-sm text-slate-500">
        No products available.
      </p>
    )}

    {/* Next Button */}
    {step.stepNumber < 4 && (
      <div className="mt-5 flex justify-center">
        {/* button */}
      </div>
    )}
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
              const selectedProducts =
                step.products.filter(
                  (product) =>
                    getProductQuantity(product) > 0
                );

              if (selectedProducts.length === 0) {
                return null;
              }

              return (
                <div key={step.id}>
                  <h3 className="mb-2 text-xs font-medium uppercase text-slate-400">
                    {step.reviewCategory}
                  </h3>

                  <div className="space-y-2">
                    {selectedProducts.map(
                      
                      (product) => (
                        <div
                          key={product.id}
                            className="grid grid-cols-[1fr_auto_56px] items-center gap-3"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <img
                              src={product.image}
                              alt=""
                              className="h-10 w-10 rounded bg-white object-contain"
                            />

                            <span className="truncate text-xs font-medium">
                              {product.name}
                            </span>
                          </div>
<div className="flex justify-center">
                         {product.category !== "plan" && (
  <QuantityStepper
    size="sm"
    quantity={getProductQuantity(product)}
    onDecrease={() => {
      const variantId =
        product.variants.length > 0
          ? activeVariants[product.id]
          : "default";

      updateQuantity(
        product.id,
        variantId,
        getProductQuantity(product) - 1
      );
    }}
    
    onIncrease={() => {
      const variantId =
        product.variants.length > 0
          ? activeVariants[product.id]
          : "default";

      updateQuantity(
        product.id,
        variantId,
        getProductQuantity(product) + 1
      );
    }}
  />
)}
</div>
                         <div className="w-[60px] text-right">
  {product.compareAtPrice && (
    <p className="text-[10px] leading-none text-[#9A9A9A] line-through">
      $
      {(
        product.compareAtPrice *
        getProductQuantity(product)
      ).toFixed(2)}
    </p>
  )}

  <p className="mt-[2px] text-[12px] font-semibold leading-none text-[#4E2FD2]">
    $
    {(
      product.price *
      getProductQuantity(product)
    ).toFixed(2)}
  </p>
</div>
                        </div>
                      )
                    )}
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

            <div className="mt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>$0.00</span>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-md bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Checkout
            </button>

            <button
              type="button"
              className="mt-3 w-full text-xs text-slate-600 underline"
            >
              Save my system for later
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BundleBuilder;