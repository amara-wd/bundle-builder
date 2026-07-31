import QuantityStepper from "../ui/QuantityStepper";
import type { Product, ProductVariant } from "../../types/bundle";

interface ReviewItemProps {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
  variantId: string;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
}

const ReviewItem = ({
  product,
  variant,
  quantity,
  variantId,
  updateQuantity,
}: ReviewItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto_60px] items-center gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <img
          src={product.image}
          alt=""
          className="h-10 w-10 rounded bg-white object-contain"
        />

        <div className="min-w-0">
          <p className="truncate text-xs font-medium">
            {product.name}
          </p>

          {variant && (
            <p className="text-[11px] text-slate-500">
              {variant.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <QuantityStepper
          size="sm"
          quantity={quantity}
          onDecrease={() =>
            updateQuantity(
              product.id,
              variantId,
              quantity - 1
            )
          }
          onIncrease={() =>
            updateQuantity(
              product.id,
              variantId,
              quantity + 1
            )
          }
        />
      </div>

      <div className="w-15 text-right">
        {product.compareAtPrice && (
          <p className="text-xs text-[#9A9A9A] line-through">
            ${(product.compareAtPrice * quantity).toFixed(2)}
          </p>
        )}

        <p className="text-[12px] font-semibold text-[#4E2FD2]">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;