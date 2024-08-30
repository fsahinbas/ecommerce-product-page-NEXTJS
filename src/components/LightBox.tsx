import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";

type LightBoxProps = {
  index: number;
  images: string[];
  thumbnails: string[];
  onClose: (flag: boolean) => void;
};
const LightBox = ({ index, images, thumbnails, onClose }: LightBoxProps) => {
  const [imageIndex, setImageIndex] = useState(index);
  const handleClick = (i: number) => {
    setImageIndex(i);
  };

  const handleChangeImage = (i: number) => {
    if (i === 1 && imageIndex < images.length - 1) {
      setImageIndex(imageIndex + i);
      return;
    }

    if (i === -1 && imageIndex > 0) {
      setImageIndex(imageIndex + i);
      return;
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-10 bg-[rgb(0,0,0)]/75 flex flex-col items-center justify-center z-100">
      <div
        className="w-[550px] relative"
        aria-label="lightbox"
        aria-hidden="true"
      >
        <button
          className="absolute -top-10 right-0"
          onClick={() => onClose(false)}
        >
          <CloseIcon />
        </button>

        <button
          className="w-14 h-14 rounded-full bg-white absolute top-[50%] right-0 -translate-y-[50%] translate-x-[50%] flex items-center justify-center group"
          onClick={() => handleChangeImage(1)}
        >
          <NextIcon />
        </button>
        <button
          className="w-14 h-14 rounded-full bg-white absolute top-[50%] left-0 -translate-y-[50%] -translate-x-[50%] flex items-center justify-center group"
          onClick={() => handleChangeImage(-1)}
        >
          <PrevIcon />
        </button>
        <Image
          src={images[imageIndex]}
          alt="product image"
          width={550}
          height={550}
          className="rounded-[15px]"
        />
      </div>
      <div
        className="w-[445px] mx-auto flex items-center justify-between mt-10"
        aria-label="thumbnails"
      >
        {thumbnails.map((thumbnail, index) => (
          <Image
            aria-active={imageIndex === index}
            key={index}
            src={thumbnail}
            alt="thumbnail image"
            width={88}
            height={88}
            className={`rounded-[10px] hover:opacity-50 cursor-pointer transition-all duration-300 ${
              imageIndex === index ? "opacity-50 border-2 border-[#FF7E1B]" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default LightBox;
