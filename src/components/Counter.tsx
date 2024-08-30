import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useStore } from "zustand";
import { useCartStore } from "@/store/cartStore";

const Counter = ({ product }: { product: Product }) => {
  const { quantity, setQuantity } = useCartStore((state) => state);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    console.log("q", quantity);
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 bg-[#F6F8FD] text-[16px] font-bold py-4 px-4 w-full md:w-[157px] rounded-[10px] ">
      <button onClick={handleDecrement}>
        <Image
          src="/images/icon-minus.svg"
          alt="minus icon"
          width={16}
          height={16}
          className="hover:opacity-50"
        />
      </button>
      <p>{quantity}</p>
      <button onClick={handleIncrement}>
        <Image
          src="/images/icon-plus.svg"
          alt="plus icon"
          width={16}
          height={16}
          className="hover:opacity-50"
        />
      </button>
    </div>
  );
};

export default Counter;
