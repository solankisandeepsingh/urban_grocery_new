import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";

export const Success = ({  setNavbarOpen }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    setNavbarOpen(true);
    navigate("/");
  };
  const {config} = useCartStore();
  console.log(config);
  return (
    <>
  
      <div>
        <div className="flex items-center justify-center h-screen">
          <div>
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-lime w-28 h-28"
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
              <h1 className="text-4xl font-bold">Order Placed Successfully!</h1>
              {/* <p>Thank you for your Shopping! Please Visit Again.</p> */}
              <button
                className="inline-flex items-center group px-3 py-2 hover:bg-lime hover:text-white rounded-lg text-lime bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={()=>navigate("/myorder")}
              >
                <BsCart3 className=" text-lime group-hover:text-white text-2xl mr-3 " />
                 My Cart
              </button>

              <button
                className="inline-flex items-center group px-3 py-2 rounded-lg hover:text-white hover:bg-lime  text-lime bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={goToHome}
              >
                <FaHome className="mr-3 text-lime group-hover:text-white text-2xl" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
