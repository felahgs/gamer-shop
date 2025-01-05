import React, { ReactNode } from "react";
import Button from "@/components/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { usdCurrency } from "@/utils/format";

export interface CartItemProps {
  genre: string;
  title: string;
  description: string;
  price: number;
  img: ReactNode;
  className?: string;
  isNew?: boolean;
  onRemove?: () => void;
}
function CartItem({
  genre,
  title,
  price,
  img,
  isNew,
  description,
  className,
  onRemove,
}: CartItemProps) {
  return (
    <div className={`flex xsm:h-48  gap-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-6 relative">
        <div className="w-64 h-40 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {img}
        </div>
        {isNew && (
          <div className="absolute rounded-md m-3 px-3 py-1 border border-neutral-200 bg-white top-0 left-0">
            New
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="uppercase font-bold text-neutral-500">{genre}</span>
          <span className="font-bold">{title}</span>
          <span className="text-neutral-500 overflow-hidden text-ellipsis">
            {description}
          </span>
        </div>
        <span className="self-end font-bold text-xl">
          {usdCurrency.format(price)}
        </span>
      </div>
      <Button
        className="self-start text-neutral-400"
        variant="text"
        title="remove item"
        aria-label="remove item"
        onClick={onRemove}
      >
        <XMarkIcon className="size-6" />
      </Button>
    </div>
  );
}

export default CartItem;
