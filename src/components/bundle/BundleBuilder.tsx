import { useState } from "react";
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

const BundleBuilder = () => {
  const [selections, setSelections] =
    useState<BundleSelections>(initialSelections);

  const [activeVariants, setActiveVariants] =
    useState<ActiveVariants>(initialActiveVariants);

  const [activeStep, setActiveStep] = useState("cameras");

  const steps = productsData.steps;

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

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        {/* LEFT - BUILDER */}
        <section>
          <div className="space-y-2">
            {steps.map((step) => {
              const isOpen =
                activeStep === step.id;

              return (
                <div
                  key={step.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
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
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                        Step {step.stepNumber} of 4
                      </p>

                      <h2 className="mt-1 text-base font-semibold text-slate-900">
                        {step.title}
                      </h2>
                    </div>

                    <span className="text-sm text-violet-600">
                      {isOpen ? "⌃" : "⌄"}
                    </span>
                  </button>

                  {/* Step Content */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-slate-100 p-4">
                      {step.products.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                          {step.products.map(
                            (product) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                activeVariant={
                                  activeVariants[
                                    product.id
                                  ]
                                }
                                quantity={getProductQuantity(
                                  product
                                )}
                                onVariantChange={(
                                  variantId
                                ) =>
                                  updateActiveVariant(
                                    product.id,
                                    variantId
                                  )
                                }
                                onQuantityChange={(
                                  quantity
                                ) => {
                                  const variantId =
                                    product.variants
                                      .length > 0
                                      ? activeVariants[
                                          product.id
                                        ]
                                      : "default";

                                  updateQuantity(
                                    product.id,
                                    variantId,
                                    quantity
                                  );
                                }}
                              />
                            )
                          )}
                        </div>
                      ) : (
                        <p className="py-8 text-center text-sm text-slate-500">
                          No products available.
                        </p>
                      )}

                      {/* Next Button */}
                      {step.stepNumber < 4 && (
                        <div className="mt-5 flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const nextStep =
                                steps[
                                  step.stepNumber
                                ];

                              if (nextStep) {
                                setActiveStep(
                                  nextStep.id
                                );
                              }
                            }}
                            className="rounded-md border border-violet-500 bg-white px-6 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50"
                          >
                            Next:{" "}
                            {steps[
                              step.stepNumber
                            ]?.title.replace(
                              "Choose your ",
                              ""
                            )}
                          </button>
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
        <aside className="h-fit rounded-lg bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Your security system
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Review your personalized protection
            system.
          </p>

          <div className="mt-6 space-y-4">
            {steps.map((step) => {
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
                          className="flex items-center justify-between gap-3"
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

                          <span className="text-xs">
                            ×{" "}
                            {getProductQuantity(
                              product
                            )}
                          </span>

                          <span className="text-xs font-medium">
                            $
                            {(
                              product.price *
                              getProductQuantity(
                                product
                              )
                            ).toFixed(2)}
                          </span>
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