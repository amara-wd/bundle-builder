import type { Plan } from "../../types/bundle";

type PlanCardProps = {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
};

const PlanCard = ({
  plan,
  selected,
  onSelect,
}: PlanCardProps) => {
  return (
    <article
      onClick={onSelect}
      className={`cursor-pointer rounded-[14px] border-2 bg-white p-5 transition ${
        selected
          ? "border-[#6D4AFF]"
          : "border-[#E6EAF4]"
      }`}
    >
      <h3 className="text-lg font-semibold">
        {plan.name}
      </h3>

      <p className="mt-2 text-sm text-[#636363]">
        {plan.description}
      </p>

      <button
        type="button"
        className="mt-2 text-xs font-medium text-[#2458FF] underline"
      >
        Learn More
      </button>

      <div className="mt-5">
        {plan.compareMonthlyPrice && (
          <p className="text-xs text-[#9A9A9A] line-through">
            ${plan.compareMonthlyPrice.toFixed(2)}/mo
          </p>
        )}

        <p className="text-2xl font-semibold text-[#4E2FD2]">
          ${plan.monthlyPrice.toFixed(2)}
          <span className="ml-1 text-sm font-normal text-[#636363]">
            /mo
          </span>
        </p>
      </div>
    </article>
  );
};

export default PlanCard;