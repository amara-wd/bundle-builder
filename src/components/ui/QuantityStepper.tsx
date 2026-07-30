type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "sm" | "md";
};
const QuantityStepper = ({
  quantity,
  onDecrease,
  onIncrease,
  size = "md",
}: QuantityStepperProps) => {
  const buttonClass =
    size === "sm"
      ? "h-5 w-5 text-sm"
      : "h-7 w-7 text-lg";

  const textClass =
    size === "sm"
      ? "text-xs"
      : "text-sm";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        className={`flex items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 ${buttonClass}`}
      >
        −
      </button>

      <span className={`min-w-5 text-center font-medium ${textClass}`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 ${buttonClass}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;