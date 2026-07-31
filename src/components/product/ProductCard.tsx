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
  className={`relative rounded-[14px] border-2 bg-white px-4 py-3.5 transition-all ${
    isSelected
      ? "border-[#6D4AFF]"
      : "border-[#E6EAF4]"
  }`}
>
      {/* Discount Badge */}
      {product.discount && (
        <span
className="
absolute
left-3
top-3
rounded-full
bg-[#4E2FD2]
px-2
py-0.75
 text-[10px] md:text-[12px]
font-semibold
text-white"
>
          {product.discount}
        </span>
      )}

     <div className="flex gap-3.5">
        {/* Product Image */}
       <div className="flex w-23.75 items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
          className="h-27.5 w-auto object-contain"
          />
        </div>

        {/* Product Information */}
       <div className="flex flex-1 flex-col justify-between">
        <h3 className=" text-[12px] md:text-[16px] font-semibold leading-5 text-[#232323]">
            {product.name}
          </h3>

          {product.description && (
           <p className="mt-1  text-[10px] md:text-[12px] leading-4.5 text-[#636363]">
              {product.description}
            </p>
          )}

          {product.learnMore && (
            <button
              type="button"
              className="mt-1 w-fit text-[10px] md:text-[12px] text-xs font-medium text-[#2458FF] underline"
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
                    className={`flex items-center gap-1 rounded border text-[10px]   px-2 py-1 text-xs ${
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

          <div className="mt-auto flex items-end justify-between gap-4 pt-2">
            {/* Quantity */}
            <QuantityStepper
            size="sm"
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
                <p className="text-[12px] md:text-[16px]  text-red-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </p>
              )}

              <p className="text-[12px] md:text-[16px]  font-medium text-slate-700">
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