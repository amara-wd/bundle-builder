import type { ActiveVariants, BundleSelections } from "../types/bundle";

export const initialSelections: BundleSelections = {
  "wyze-cam-v4": {
    white: 1,
  },

  "wyze-cam-pan-v3": {
    white: 2,
  },

  "wyze-cam-floodlight-v2": {
    white: 0,
    black: 0,
  },

  "wyze-duo-cam-doorbell": {
    default: 0,
  },

  "wyze-battery-cam-pro": {
    white: 0,
    black: 0,
  },

  "wyze-sense-motion-sensor": {
    default: 2,
  },

  "wyze-sense-hub": {
    default: 1,
  },

  "wyze-microsd-card-256gb": {
    default: 2,
  },

  "cam-unlimited": {
    default: 1,
  },
};

export const initialActiveVariants: ActiveVariants = {
  "wyze-cam-v4": "white",
  "wyze-cam-pan-v3": "white",
  "wyze-cam-floodlight-v2": "white",
  "wyze-battery-cam-pro": "white",
};