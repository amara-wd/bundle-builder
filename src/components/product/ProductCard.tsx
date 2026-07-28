import type { Product } from "../../types/bundle";
import QuantityStepper from "../ui/QuantityStepper";

type ProductCardProps = {
  product: Product;
  activeVariant?: string;
  quantity: number;
  onVariantChange: (variantId: string) => void;
  onQuantityChange: (quantity: number) => void;
};

const ProductCard = ({
  product,
  activeVariant,
  quantity,
  onVariantChange,
  onQuantityChange,
}: ProductCardProps) => {
  const isSelected = quantity > 0;

  return (
    <article
      className={`relative flex min-h-42.5 flex-col rounded-xl border-2 bg-white p-4 transition ${
        isSelected
          ? "border-violet-500"
          : "border-transparent"
      }`}
    >
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute left-3 top-3 rounded-full bg-violet-600 px-2 py-1 text-xs font-semibold text-white">
          {product.discount}
        </span>
      )}

      <div className="flex flex-1 gap-4">
        {/* Product Image */}
        <div className="flex w-28 shrink-0 items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-28 max-w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-base font-semibold text-slate-900">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {product.description}
            </p>
          )}

          {product.learnMore && (
            <button
              type="button"
              className="mt-1 w-fit text-xs font-medium text-blue-600 underline"
            >
              Learn More
            </button>
          )}

          {/* Variants */}
          {product.variants &&
            product.variants.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() =>
                      onVariantChange(variant.id)
                    }
                    className={`flex items-center gap-1 rounded border px-2 py-1 text-xs ${
                      activeVariant === variant.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    {variant.swatch && (
                      <img
                        src={variant.swatch}
                        alt=""
                        className="h-4 w-4 object-contain"
                      />
                    )}

                    {variant.name}
                  </button>
                ))}
              </div>
            )}

          <div className="mt-auto flex items-end justify-between gap-4 pt-3">
            {/* Quantity */}
            <QuantityStepper
              quantity={quantity}
              onDecrease={() =>
                onQuantityChange(quantity - 1)
              }
              onIncrease={() =>
                onQuantityChange(quantity + 1)
              }
            />

            {/* Price */}
            <div className="text-right">
              {product.compareAtPrice && (
                <p className="text-xs text-red-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </p>
              )}

              <p className="text-sm font-medium text-slate-700">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;