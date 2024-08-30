"use client";
import Counter from "@/components/Counter";
import CartIcon from "@/components/icons/CartIcon";
import Image from "next/image";
import { useState } from "react";
import CartModal from "@/components/CartModal";
import Header from "@/components/Header";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";
import LightBox from "@/components/LightBox";
import NextIcon from "@/components/icons/NextIcon";
import PrevIcon from "@/components/icons/PrevIcon";

export default function Home() {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, setCartItems, quantity } = useCartStore((state) => state);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const product: Product | undefined = products.find(
    (product) => product.id === 1
  );

  const handleClickThumb = (thumb: number) => {
    setActiveThumbIndex(thumb);
    setMainImageIndex(thumb);
  };

  const handleClickCartIcon = (flag: boolean) => {
    setIsCartModalOpen(flag);
  };

  const handleClickMenuIcon = (flag: boolean) => {
    setIsMobileMenuOpen(flag);
  };

  const handleClickAddToCart = () => {
    product && setCartItems(product);
  };

  const handleCloseLightBox = () => {
    setIsLightBoxOpen(false);
  };

  return (
    <>
      <Header
        handleCartOpen={handleClickCartIcon}
        handleMenuOpen={handleClickMenuIcon}
      />
      <main
        className={`w-full md:w-[1110px] mx-auto p-0 md:p-12 grid grid-col-1 grid-gap-2 md:grid-cols-2 md:grid-gap-[125px] relative ${
          isMobileMenuOpen ? "h-[calc(100vh-91px)] overflow-hidden" : ""
        }`}
      >
        {product && (
          <div
            aria-label="product image slider"
            className="relative w-full h-[calc(100vw)] md:w-[445px] md:h-[445px]"
          >
            <Image
              src={product.images[mainImageIndex]}
              alt="product image"
              fill
              className="rounded-none md:rounded-[15px] mb-8 cursor-pointer hidden md:block"
              onClick={() => setIsLightBoxOpen(true)}
            />

            <Image
              src={product.images[mainImageIndex]}
              alt="product image"
              fill
              className="rounded-none md:rounded-[15px] mb-8 cursor-pointer md:hidden"
            />
            <button
              className="w-10 h-10 rounded-full bg-white absolute top-[50%] right-10 -translate-y-[50%] translate-x-[50%] flex items-center justify-center group md:hidden"
              onClick={() =>
                setMainImageIndex(
                  mainImageIndex === product.images.length - 1
                    ? 0
                    : mainImageIndex + 1
                )
              }
            >
              <NextIcon />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white absolute top-[50%] left-10 -translate-y-[50%] -translate-x-[50%] flex items-center justify-center group md:hidden"
              onClick={() =>
                setMainImageIndex(mainImageIndex === 0 ? 0 : mainImageIndex - 1)
              }
            >
              <PrevIcon />
            </button>
            <div
              aria-label="thumbnail images"
              className="hidden md:flex md:items-center md:justify-between md:gap-8 md:mt-[455px]"
            >
              {product.thumbnails.map((thumbnail, index) => (
                <Image
                  aria-active={activeThumbIndex === index}
                  key={index}
                  src={thumbnail}
                  alt="thumbnail image"
                  width={88}
                  height={88}
                  className={`rounded-[10px] hover:opacity-50 cursor-pointer transition-all duration-300 ${
                    activeThumbIndex === index
                      ? "opacity-50 border-2 border-[#FF7E1B]"
                      : ""
                  }`}
                  onClick={() => handleClickThumb(index)}
                />
              ))}
            </div>
          </div>
        )}
        <div
          aria-labelledby="productTitle"
          aria-describedby="productDescription"
          className="p-6 md:p-0"
        >
          <p className="text-[#69707D] text-[12px] md:text-[13px] space-x-[2px] uppercase font-bold mb-6">
            Sneaker Company
          </p>
          <h1
            id="productTitle"
            className="text-[28px] md:text-[44px] font-bold text-[#1D2026] leading-12 mb-8"
          >
            Fall Limited Edition Sneakers
          </h1>
          <p
            className="text-[#69707D] font-normal text-[15px] md:text-[16px] leading-6 md:leading-7"
            id="productDescription"
          >
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div
            aria-label="price and discount"
            className="flex items-start justify-between md:justify-start gap-6 mt-6"
          >
            <div className="flex flex-row justify-between items-center gap-4 md:gap-0 md:flex-col md:items-start">
              <p className="text-black text-[28px] font-bold">$125.00</p>
              <p className="text-[#69707D] text-[16px] font-bold text-overline line-through">
                $125.00
              </p>
            </div>
            <p className="text-white  bg-black text-[16px] font-bold py-1 px-2 rounded-md">
              50%
            </p>
          </div>
          <div
            aria-label="quantity and add to cart"
            className="flex flex-col md:flex-row items-center gap-4 mt-8"
          >
            {product && <Counter product={product} />}
            <button
              className="bg-[var(--orange)] text-[#1D2026] flex items-center gap-4 py-4 px-20 rounded-[10px] hover:bg-[#FFAB6A] disabled:bg-[#FFAB6A] disabled:cursor-not-allowed w-full md:w-auto"
              onClick={handleClickAddToCart}
              disabled={quantity === 0}
            >
              <CartIcon />
              <span className="text-[16px] font-bold text-[#1D2026]">
                Add to cart
              </span>
            </button>
          </div>
        </div>

        <CartModal isCartModalOpen={isCartModalOpen} />
      </main>
      {isLightBoxOpen && product && (
        <LightBox
          onClose={handleCloseLightBox}
          index={mainImageIndex}
          images={product.images}
          thumbnails={product?.thumbnails}
        />
      )}
    </>
  );
}
