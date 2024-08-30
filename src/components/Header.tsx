"use client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = ({
  handleCartOpen,
  handleMenuOpen,
}: {
  handleCartOpen: (isCartOpen: boolean) => void;
  handleMenuOpen: (isMobileMenuOpen: boolean) => void;
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClickCart = () => {
    setIsCartOpen((prev) => !prev);
    return handleCartOpen(isCartOpen);
  };

  const handleClickMenu = (flag: boolean) => {
    setIsMobileMenuOpen(flag);
    handleMenuOpen(flag);
  };
  const { cartItems } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <header
        aria-label="header"
        className="w-full px-6 py-5 md:w-[1110px] mx-auto md:my-7 flex justify-between items-center md:mb-[34px]"
      >
        <button
          aria-label="mobile menu button"
          className="md:hidden"
          onClick={() => handleClickMenu(true)}
        >
          <Image
            src={"/images/icon-menu.svg"}
            alt="mobile menu icon"
            height={15}
            width={16}
          />
        </button>
        <div className="flex items-center gap-14">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={137.5}
              height={20}
            />
          </Link>
          <nav
            aria-label="navigation"
            aria-expanded={isMobileMenuOpen}
            className={` ${
              isMobileMenuOpen ? "block" : "hidden"
            } h-[100vh] bg-white md:bg-transparent md:h-auto md:block absolute md:static w-[250px] md:w-auto top-0 left-0 z-10 p-6 md:p-0`}
          >
            <button
              className="md:hidden"
              onClick={() => handleClickMenu(false)}
            >
              <Image
                src="/images/icon-close.svg"
                width={13.44}
                height={13.44}
                alt="close icon"
              />
            </button>
            <ul className="flex flex-col md:flex-row md:items-center gap-8 mt-12 md:mt-0">
              <li>
                <Link
                  href="/"
                  className="font-bold md:font-normal text-[#69707D] text-[18px] md:text-[15px] leading-[26px] border-b-[#FF7E1B]  pb-[45px] md:hover:border-b-4  hover:text-[#1D2026]"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-bold md:font-normal text-[#69707D] text-[18px] md:text-[15px] leading-[26px] border-b-[#FF7E1B]  pb-[45px] md:hover:border-b-4  hover:text-[#1D2026]"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-bold md:font-normal text-[#69707D] text-[18px] md:text-[15px] leading-[26px] border-b-[#FF7E1B]  pb-[45px] md:hover:border-b-4  hover:text-[#1D2026]"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-bold md:font-normal text-[#69707D] text-[18px] md:text-[15px] leading-[26px] border-b-[#FF7E1B]  pb-[45px] md:hover:border-b-4  hover:text-[#1D2026]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-bold md:font-normal text-[#69707D] text-[18px] md:text-[15px] leading-[26px] border-b-[#FF7E1B]  pb-[45px] md:hover:border-b-4  hover:text-[#1D2026]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div
          aria-label="user avatar and cart link"
          className="flex items-center gap-11"
        >
          <div className="relative" aria-label="cart button">
            <div className="group cursor-pointer" onClick={handleClickCart}>
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#69707D"
                  fill-rule="nonzero"
                  className="group-hover:fill-[#1D2026]"
                />
              </svg>
            </div>

            {quantity > 0 && (
              <p className="absolute -top-2 -right-2 w-[19px] h-[13px] rounded-full bg-[#FF7E1B] text-white text-[10px] font-bold flex items-center justify-center py-[3px] px-[6px]">
                {quantity}
              </p>
            )}
          </div>
          <Image
            src="/images/image-avatar.png"
            alt="user avatar"
            width={50}
            height={50}
            className="cursor-pointer border-2 border-[transparent] rounded-full hover:border-[var(--orange)] select-none"
          />
        </div>
      </header>
      <div className="h-[1px] w-fuşş md:w-[1110px] mx-auto bg-[#E4E9F2]"></div>
    </>
  );
};

export default Header;
