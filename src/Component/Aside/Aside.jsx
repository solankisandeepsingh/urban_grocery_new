import React from "react";
import {
  AiTwotoneBank,
  AiTwotoneSafetyCertificate,
  AiTwotoneWallet,
} from "react-icons/ai";
import {
  FaBell,
  FaFileContract,
  FaFoursquare,
  FaHome,
  FaRegAddressBook,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Aside = () => {
const location =  useLocation()
console.log(location,"loca")
  return (
    <>
      <div className="max-w-[100%]">
        <ul className="font-medium w-full">
          <li className={`border border-light_gray ${location.pathname === "/address" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-light_gray hover:bg-[#b9b6b6]'} mb-2 rounded-xl shadow-md`}>
            <NavLink to={"/address"}>
              <a
                to="/address"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:hover:bg-gray-700"
              >
                {/* <FaHome className="text-darkgray text-[25px]" /> */}
                <FaHome className={`${location.pathname === "/address" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`}/>
                {/* <span className="ml-3   text-lg font-light"> */}
                <span className={`ml-3 ${location.pathname === "/address" ? 'text-white font-light':'text-light_gray'}`}>
      
                  My Address
                </span>
              </a>
            </NavLink>
          </li>
          <li className={`border border-light_gray ${location.pathname === "/myorder" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2  rounded-xl shadow-md`}>
            <NavLink to={"/myorder"}>
              <a
                to="/myorder"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <FaRegAddressBook className="text-darkgray text-[25px]" /> */}
                <FaRegAddressBook className={`${location.pathname === "/myorder" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`}/>
                
                <span className={`ml-3 ${location.pathname === "/myorder" ? 'text-white font-light':'text-light_gray'}`}>
                  My Order
                </span>
              </a>
            </NavLink>
          </li>
          <li className={`border border-light_gray ${location.pathname === "/about" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2  rounded-xl shadow-md`}>
            <NavLink to={"/about"}> 
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <FaBell className="text-darkgray text-[25px]" /> */}
                <FaBell className={`${location.pathname === "/about" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`}/>
              
                <span className={`ml-3 ${location.pathname === "/about" ? 'text-white font-light':'text-light_gray'}`}>
                  About_Us
                </span>
              </a>
            </NavLink>
          </li>

          <li className={`border border-light_gray ${location.pathname === "/contact" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2 rounded-xl shadow-md`}>
            <NavLink to={"/contact"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <FaFileContract className="text-darkgray text-[25px]" /> */}
                <FaFileContract className={`${location.pathname === "/contact" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`} />
                <span className={`ml-3 ${location.pathname === "/contact" ? 'text-white font-light':'text-light_gray'}`}>
                  Contact
                </span>
              </a>
            </NavLink>
          </li>

          {/* <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/payment"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiTwotoneBank className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    Payment
                  </span>
                </a>
              </NavLink>
            </li> */}

          <li className={`border border-light_gray ${location.pathname === "/wallet" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2 6] rounded-xl shadow-md`}>
            <NavLink to={"/wallet"}>
              <a
                to="/wallet"
                className="flex items-center p-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <AiTwotoneWallet className="text-darkgray text-[25px]" /> */}
                <AiTwotoneWallet className={`${location.pathname === "/wallet" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`}/>
                <span className={`ml-3 ${location.pathname === "/wallet" ? 'text-white font-light':'text-light_gray'}`}>
                  My Wallet
                </span>
              </a>
            </NavLink>
          </li>
          <li className={`border border-light_gray ${location.pathname === "/privacy" ? ' bg-lime transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2  rounded-xl shadow-md`}>
            <NavLink to={"/privacy"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <AiTwotoneSafetyCertificate className="text-darkgray text-[25px]" /> */}
                <AiTwotoneSafetyCertificate className={`${location.pathname === "/privacy" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`}/>
                <span className={`ml-3 ${location.pathname === "/privacy" ? 'text-white font-light':'text-light_gray'}`}>
                  Privacy
                </span>
              </a>
            </NavLink>
          </li>

          <li className={`border border-light_gray ${location.pathname === "/conditons" ? ' bg-lime  transition-all ease-in-out hover:scale-105':'text-lightgray hover:bg-[#b9b6b6]'} mb-2  rounded-xl shadow-md`}>
            <NavLink to={"/conditons"}> 
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <FaBell className="text-darkgray text-[25px]" /> */}
                <FaBell className={`${location.pathname === "/conditons" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`} />
                <span className={`ml-3 ${location.pathname === "/conditons" ? 'text-white font-light':'text-light_gray'}`}>
                  Term & Conditons
                </span>
              </a>
            </NavLink>
          </li>

          <li className={`border border-light_gray ${location.pathname === "/faq" ? 'bg-lime':'text-lightgray hover:bg-[#b9b6b6]'} mb-2  rounded-xl shadow-md`}>
            <NavLink to={"/faq"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* <FaFoursquare className="text-darkgray text-[25px]" /> */}
                <FaFoursquare className={`${location.pathname === "/faq" ? 'text-white text-[25px]':'text-light_gray text-[25px]'}`} />
                <span className={`ml-3 ${location.pathname === "/faq" ? 'text-white font-light':'text-light_gray'}`}>
                  FAQ
                </span>
              </a>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
