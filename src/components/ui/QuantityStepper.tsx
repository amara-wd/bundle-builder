type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const QuantityStepper = ({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-lg text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-5 text-center text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-lg text-slate-700 transition hover:bg-slate-50"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;