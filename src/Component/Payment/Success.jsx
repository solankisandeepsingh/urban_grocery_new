import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DropdownMenu from "../AccountDropdown/DropdownMenu";

export const Success = ({isOpen,setIsOpen}) => {
  return (
    <>
    <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 xs:mt-0.5 bg-white">
        <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
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
              <h1 className="text-4xl font-bold">Thank You !</h1>
              <p>Thank you for your Shopping! Please Visit Again.</p>
              <NavLink to={"/"}>
                <button className="inline-flex items-center px-3 py-2 rounded-lg text-lime bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring">
                 
                  <FaArrowLeft className=" w-3 h-3 mr-1" />
                  Back
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
