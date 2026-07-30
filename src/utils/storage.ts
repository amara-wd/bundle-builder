import type {
  BundleSelections,
  ActiveVariants,
} from "../types/bundle";

import {
  initialSelections,
  initialActiveVariants,
} from "../data/initialState";

export const STORAGE_KEYS = {
  selections: "bundleSelections",
  variants: "bundleVariants",
  plan: "bundlePlan",
};

// ---------- Selections ----------

export const loadSelections = (): BundleSelections => {
  const data = localStorage.getItem(STORAGE_KEYS.selections);

  return data
    ? JSON.parse(data)
    : initialSelections;
};

export const saveSelections = (
  selections: BundleSelections
) => {
  localStorage.setItem(
    STORAGE_KEYS.selections,
    JSON.stringify(selections)
  );
};

// ---------- Variants ----------

export const loadVariants = (): ActiveVariants => {
  const data = localStorage.getItem(STORAGE_KEYS.variants);

  return data
    ? JSON.parse(data)
    : initialActiveVariants;
};

export const saveVariants = (
  variants: ActiveVariants
) => {
  localStorage.setItem(
    STORAGE_KEYS.variants,
    JSON.stringify(variants)
  );
};

// ---------- Plan ----------

export const loadPlan = (): string => {
  return (
    localStorage.getItem(STORAGE_KEYS.plan) ??
    "cam-unlimited"
  );
};

export const savePlan = (planId: string) => {
  localStorage.setItem(
    STORAGE_KEYS.plan,
    planId
  );
};