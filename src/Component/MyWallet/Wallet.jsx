import React from "react";

import { Aside } from "../Aside/Aside";

export const Wallet = () => {
  
  return (
    <>
      <div>
        <div className="md:flex md:flex-row">
        <div class="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12  md:mt-10">
          <Aside />
        </div>

          <div className="md:w-3/4  ">
            <div className="mt-48">
              <div className="xs:text-center xs:justify-center xs:flex xs:flex-col md:text-center md:justify-center md:flex flex-col sm:flex sm:text-center sm:justify-center border border-light_gray shadow-lg xs:w-40 xs:h-20 xs:ml-28 md:w-72 sm:w-[400px] sm:h-[100px] md:h-24 md:ml-[250px] xs:overflow-y-hidden">
                <p className="xs:text-base xs:font-semibold sm:text-3xl md:text-[20px] md:flex md:flex-col">
                  My Balance:
                </p>
                <span className="md:mt-50 md:font-semibold sm:text-2xl xs:font-bold">
                  ₹500
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
