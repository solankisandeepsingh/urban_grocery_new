import React from "react";

import { Aside } from "../Aside/Aside";

export const Wallet = () => {
  return (
    <>
      <div>
       
        <div className="md:flex md:flex-row">
        <div className="h-full w-1/4 px-12 py-36 mt-10 fixed xs:invisible md:visible">
        <div className="">
        <Aside/>
       </div>
        </div>

        <div className="md:w-3/4 xs:overflow-y-hidden "> 
        <div className="md:mt-48 xs:mt-24 xs:overflow-y-hidden sm:mt-48">
          <div className="xs:text-center xs:justify-center xs:flex xs:flex-col md:text-center md:justify-center md:flex flex-col sm:flex sm:text-center sm:justify-center sm:ml-[200px] border border-light_gray shadow-lg xs:w-40 xs:h-20 xs:ml-28 md:w-72 sm:w-[400px] sm:h-[100px] md:h-24 md:ml-[550px] xs:overflow-y-hidden">
            <p className="xs:text-base xs:font-semibold sm:text-3xl md:text-[20px] md:flex md:flex-col">My Balance:</p>
            <span className="md:mt-50 md:font-semibold sm:text-2xl xs:font-bold">₹500</span>
          </div>
        </div>
          
        </div>
      </div>
      </div>
    </>
  );
};



