type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  hardwareTotal: number;
  grandTotal: number;
  monthlyPlanPrice: number;
  selectedPlan?: {
    name: string;
  };
};

const CheckoutModal = ({
  open,
  onClose,
  hardwareTotal,
  grandTotal,
  monthlyPlanPrice,
  selectedPlan,
}: CheckoutModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl">✓</span>
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-900">
          Bundle Ready!
        </h2>

        <p className="mt-3 text-center text-sm text-slate-600">
          Your security system has been configured successfully.
        </p>

        <div className="mt-6 rounded-xl bg-[#EDF4FF] p-4">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Hardware
            </span>

            <span className="font-medium">
              ${hardwareTotal.toFixed(2)}
            </span>
          </div>

          {selectedPlan && (
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-slate-500">
                Plan
              </span>

              <span className="font-medium">
                ${monthlyPlanPrice.toFixed(2)}/mo
              </span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>

            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#4E2FD2] py-3 font-semibold text-white hover:bg-[#3f25b4]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;