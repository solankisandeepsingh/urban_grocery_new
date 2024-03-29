import React from "react";
import { BsCart3 } from "react-icons/bs";
import {  FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";
import { useEffect } from "react";

export const Success = ({ setNavbarOpen,NavbarOpen }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    setNavbarOpen(true);
    navigate("/");
  };
  useEffect(()=>{
    setNavbarOpen(false)
  },[NavbarOpen])
  
  const { config } = useCartStore();
  console.log(config);
  return (
    <>
      <div className="flex flex-col items-center text-center justify-center mt-24 sm:mt-10">
        <div className="md:mt-6 sm:mt-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-lime w-28 h-28 sm:w-40 sm:h-40 xs:w-24 xs:h-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-4xl font-bold xs:text-[18px] sm:text-[30px]">
          Order Placed Successfully!
        </p>
        <div className="flex gap-3 md:mt-4 sm:mt-4 md:py-8 xs:py-4">
          <button
            className="inline-flex items-center px-4 py-2 xs:text-[12px] sm:text-[20px] md:text-[16px] rounded-lg bg-lime text-white bg-indigo-600 border hover:bg-customGreen  focus:outline-none focus:ring"
            onClick={() => navigate("/myorder")}
          >
            <BsCart3 className=" text-white text-2xl mr-1 xs:text-[14px] sm:text-[20px] md:text-[20px]" />
            My Orders
          </button>

          <button
            className="inline-flex items-center px-3 py-2 xs:text-[12px] sm:text-[20px] md:text-[16px] rounded-lg  bg-lime text-white hover:bg-customGreen  border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring"
            onClick={goToHome}
          >
            <FaHome className="mr-1 text-white text-2xl xs:text-[14px] sm:text-[20px] md:text-[20px]" />
            Home 
          </button>
        </div>
      </div>
    </>
  );
};
