import React from "react";
import { useImgStore } from "../Component/zustand/useImgStore";

export const FoodDelivery = () => {
  const { allImg } = useImgStore();

  return (
    <div className="mt-5">
      <img
        src={allImg["29"]}
        alt=""
        className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
      />
    </div>
  );
};
