import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
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
              
              <button
                className="inline-flex items-center px-3 py-2 rounded-lg text-lime bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={()=>{
                  setNavbarOpen(true)
                  navigate('/myorder')
                }}
              >
                <FaArrowLeft className=" w-3 h-3 mr-1" />
                Goto My Orders
              </button>
              <button
                className="inline-flex items-center px-3 py-2 rounded-lg text-lime bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={goToHome}
              >
                <FaArrowLeft className=" w-3 h-3 mr-1" />
                Click here for Home
              </button>          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
