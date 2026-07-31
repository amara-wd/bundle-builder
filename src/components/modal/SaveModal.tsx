type SaveModalProps = {
  open: boolean;
  onClose: () => void;
  hardwareTotal: number;
  grandTotal: number;
  monthlyPlanPrice: number;
  selectedPlan?: {
    name: string;
  };
};

const SaveModal = ({
  open,
  onClose,
  hardwareTotal,
  grandTotal,
  monthlyPlanPrice,
  selectedPlan,
}: SaveModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl text-green-600">✓</span>
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold">
          System Saved
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          Your security system has been saved on this device.
          You can come back anytime and continue where you left off.
        </p>

        <div className="mt-6 space-y-3 rounded-xl bg-[#EDF4FF] p-4">

          <div className="flex justify-between">
            <span>Hardware</span>
            <span>${hardwareTotal.toFixed(2)}</span>
          </div>

          {selectedPlan && (
            <div className="flex justify-between">
              <span>{selectedPlan.name}</span>
              <span>${monthlyPlanPrice.toFixed(2)}/mo</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>FREE</span>
          </div>

          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#4E2FD2] py-3 font-semibold text-white hover:bg-[#3f25b4]"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default SaveModal;