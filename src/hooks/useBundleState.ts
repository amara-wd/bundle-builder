import { useEffect, useState } from "react";
import productsData from "../data/products.json";

import {
  getHardwareTotal,
  getCompareTotal,
  getSavings,
  getGrandTotal,
  getMonthlyPlanPrice,
} from "../utils/bundleCalculations";

import {
  loadSelections,
  saveSelections,
  loadVariants,
  saveVariants,
  loadPlan,
  savePlan,
} from "../utils/storage";

import type {
  ActiveVariants,
  BundleSelections,
  BundleStep,
  PlanStep,
} from "../types/bundle";

export default function useBundleState() {
  const [selections, setSelections] =
    useState<BundleSelections>(loadSelections);

  const [activeVariants, setActiveVariants] =
    useState<ActiveVariants>(loadVariants);

  const [selectedPlanId, setSelectedPlanId] =
    useState<string | null>(loadPlan);

  const steps = productsData.steps as BundleStep[];

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setSelections((previous) => ({
      ...previous,
      [productId]: {
        ...previous[productId],
        [variantId]: Math.max(0, quantity),
      },
    }));
  };

  const updateActiveVariant = (
    productId: string,
    variantId: string
  ) => {
    setActiveVariants((previous) => ({
      ...previous,
      [productId]: variantId,
    }));
  };

  const planStep = steps.find(
    (step): step is PlanStep => step.id === "plan"
  );

  const selectedPlan = planStep?.plans.find(
    (plan) => plan.id === selectedPlanId
  );

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

  const monthlyPlanPrice =
    getMonthlyPlanPrice(selectedPlan);

  const savings = getSavings(
    compareTotal,
    hardwareTotal
  );

  const grandTotal =
    getGrandTotal(hardwareTotal);

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

  return {
    steps,

    selections,
    activeVariants,
    selectedPlanId,
    selectedPlan,

    hardwareTotal,
    compareTotal,
    savings,
    grandTotal,
    monthlyPlanPrice,

    updateQuantity,
    updateActiveVariant,
    setSelectedPlanId,
  };
}