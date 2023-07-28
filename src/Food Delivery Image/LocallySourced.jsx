import React from "react";
import { useImgStore } from "../Component/zustand/useImgStore";

export const LocallySourced = () => {
  const { allImg } = useImgStore();
  return (
    // <div className="m-5 ">
    //   {/* <img
    //     src={allImg["32"]}
    //     alt=""
    //     className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
    //   /> */}
    //   <img
    //               src={allImg["37"]}
    //               alt=""
    //               className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
    //             />
    // </div>

    // <div className="md:w-auto md:p-2 md:mt-4 xs:py-2">
    //   <img
    //     src={allImg["37"]}
    //     alt=""
    //     className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
    //   />
    // </div>
    <></>
  );
};
