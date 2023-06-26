import React from "react";
import DropdownMenu from "../AccountDropdown/DropdownMenu";
import { NavLink } from "react-router-dom";
import { FaBell, FaHome, FaRegAddressBook, FaWallet } from "react-icons/fa";

export const Wallet = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div>
        <div className="xs:mt-0.5 fixed">
          <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="md:flex md:flex-row">
        <div className="h-full w-1/4 px-12 py-36 mt-10 fixed xs:invisible md:visible">
        <ul className="font-medium xs:invisible md:visible md:fixed">
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/address"}>
                <a
                  to="/address"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="text-darkgray text-lg" />
                  <span className="ml-3 text-light_gray xs:text-xs font-light">
                   My Address
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg ">
              <NavLink to={"/myorder"}>
                <a
                  to="/myorder"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressBook className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3 text-lightgray xs:text-xs font-thin">
                  My Order
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/wallet"}>
              <a
                to="/wallet"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaWallet className="text-darkgray text-lg" />
                <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                 My Wallet
                </span>
              </a>
              </NavLink>
              
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/"}>
              <a
                to="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaBell className="text-darkgray text-lg" />
                <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                  Logout
                </span>
              </a>
              </NavLink>
             
            </li>
          </ul>
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

{
  /* 
    <div className="mt-[300px]">    
     <div className="text-center justify-center flex flex-col border border-light_gray shadow-lg w-72 h-24 ml-[550px] ">
       <p className="text-[10px] flex flex-col">My Balance:</p> 
       <span className="mt-50 font-semibold">₹500</span>
      </div>
    </div> */
}
