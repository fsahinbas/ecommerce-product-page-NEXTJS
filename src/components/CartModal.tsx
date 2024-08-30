import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

const CartModal = ({ isCartModalOpen }: { isCartModalOpen: boolean }) => {
  const { cartItems, removeCartItem } = useCartStore();

  const handleClick = (id: number) => {
    removeCartItem(id);
  };

  return (
    <div
      className={` ${
        !isCartModalOpen ? "hidden" : ""
      } w-[360px] bg-white rounded-lg absolute top-3 right-3 md:-top-2  md:right-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.3)]`}
      aria-modal={isCartModalOpen}
      aria-labelledby="cartTitle"
    >
      <header className="p-4 border-b border-[#E4E9F2]">
        <p className="text-[#1D2026] text-[16px] font-bold" id="cartTitle">
          Cart
        </p>
      </header>
      <div className="flex flex-col items-center justify-center">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <div className="flex items-center justify-between gap-4 p-6">
              <Image
                src={cartItem.product.images[0]}
                alt="product image"
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p>{cartItem.product.name}</p>
                <p>
                  {cartItem.product.price} x {cartItem.quantity}
                  <strong>
                    &nbsp;${cartItem.product.price * cartItem.quantity}
                  </strong>
                </p>
              </div>
              <Image
                src="/images/icon-delete.svg"
                alt="delete icon"
                width={14}
                height={14}
                className="cursor-pointer"
                onClick={() => handleClick(cartItem.product.id)}
              />
            </div>
          ))}
        {cartItems.length > 0 && (
          <button className="bg-[var(--orange)] text-[#1D2026] flex justify-center items-center gap-4 py-4 px-20 rounded-[10px] hover:bg-[#FFAB6A] w-[calc(100%-48px)] mt-6  mb-8">
            <span className="text-[16px] font-bold text-[#1D2026]">
              Checkout
            </span>
          </button>
        )}
        {cartItems.length === 0 && (
          <p className="text-[#69707D] text-[16px] leading-[26px] font-bold py-[85px] px-[109px]">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartModal;
