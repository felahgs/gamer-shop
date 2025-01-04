import React, { ReactNode } from "react";
import Button from "@/components/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

export interface CartItemProps {
  genre: string;
  title: string;
  description: string;
  price: number;
  img: ReactNode;
  className?: string;
  onRemove?: () => void;
}
function CartItem({
  genre,
  title,
  price,
  img,
  description,
  className,
  onRemove,
}: CartItemProps) {
  return (
    <div className={`flex xsm:h-48  gap-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-64 h-40 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {img}
        </div>
        <div className="flex flex-col gap-1">
          <span className="uppercase font-bold text-neutral-500">{genre}</span>
          <span className="font-bold">{title}</span>
          <span className="text-neutral-500 overflow-hidden text-ellipsis">
            {description}
          </span>
        </div>
        <span className="self-end font-bold text-xl">${price}</span>
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
