import React from "react";
import {
  AiFillContacts,
  AiOutlineShoppingCart,
  AiTwotoneBank,
  AiTwotoneSafetyCertificate,
  AiTwotoneWallet,
} from "react-icons/ai";
import { BsCart3, BsInfoCircleFill } from "react-icons/bs";
import {
  FaBell,
  FaBook,
  FaFileContract,
  FaFoursquare,
  FaHome,
  FaRegAddressBook,
} from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const Aside = () => {
  const location = useLocation();
  console.log(location, "loca");
  return (
    <>
      <div className="max-w-[100%]">
        <ul className="font-medium w-full">
          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out ${
              location.pathname === "/address"
                ? " bg-lime  "
                : "text-light_gray hover:bg-[#dfdfdf]"
            } mb-2 rounded-xl shadow-sm`}
          >
            <NavLink to={"/address"}>
              <a
                to="/address"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:hover:bg-gray-700"
              >
                <FaHome
                  className={`${
                    location.pathname === "/address"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/address"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  My Address
                </span>
              </a>
            </NavLink>
          </li>
          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out ${
              location.pathname === "/myorder"
                ? " bg-lime "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2  rounded-xl shadow-md`}
          >
            <NavLink to={"/myorder"}>
              <a
                to="/myorder"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsCart3
                  className={`${
                    location.pathname === "/myorder"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />

                <span
                  className={`ml-3 ${
                    location.pathname === "/myorder"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  My Orders
                </span>
              </a>
            </NavLink>
          </li>
          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out  ${
              location.pathname === "/about"
                ? " bg-lime "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2  rounded-xl shadow-md`}
          >
            <NavLink to={"/about"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsInfoCircleFill
                  className={`${
                    location.pathname === "/about"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />

                <span
                  className={`ml-3 ${
                    location.pathname === "/about"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  About Us
                </span>
              </a>
            </NavLink>
          </li>

          <li
            className={`border border-light_gray  hover:scale-105 transition-all ease-in-out  ${
              location.pathname === "/contact"
                ? " bg-lime "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2 rounded-xl shadow-md`}
          >
            <NavLink to={"/contact"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RiContactsFill
                  className={`${
                    location.pathname === "/contact"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/contact"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  Contact
                </span>
              </a>
            </NavLink>
          </li>

          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out   ${
              location.pathname === "/wallet"
                ? " bg-lime "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2 6] rounded-xl shadow-md`}
          >
            <NavLink to={"/wallet"}>
              <a
                to="/wallet"
                className="flex items-center p-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiTwotoneWallet
                  className={`${
                    location.pathname === "/wallet"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/wallet"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  My Wallet
                </span>
              </a>
            </NavLink>
          </li>
          <li
            className={`border border-light_gray  hover:scale-105 transition-all ease-in-out  ${
              location.pathname === "/privacy"
                ? " bg-lime "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2  rounded-xl shadow-md`}
          >
            <NavLink to={"/privacy"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiTwotoneSafetyCertificate
                  className={`${
                    location.pathname === "/privacy"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/privacy"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  Privacy
                </span>
              </a>
            </NavLink>
          </li>

          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out ${
              location.pathname === "/conditons"
                ? " bg-lime  "
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2  rounded-xl shadow-md`}
          >
            <NavLink to={"/conditons"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaBook
                  className={`${
                    location.pathname === "/conditons"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/conditons"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
                  Term & Conditons
                </span>
              </a>
            </NavLink>
          </li>

          <li
            className={`border border-light_gray hover:scale-105 transition-all ease-in-out ${
              location.pathname === "/faq"
                ? "bg-lime"
                : "text-lightgray hover:bg-[#dfdfdf]"
            } mb-2  rounded-xl shadow-md`}
          >
            <NavLink to={"/faq"}>
              <a
                to="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaFoursquare
                  className={`${
                    location.pathname === "/faq"
                      ? "text-white text-[25px]"
                      : "text-light_gray text-[25px]"
                  }`}
                />
                <span
                  className={`ml-3 ${
                    location.pathname === "/faq"
                      ? "text-white font-light"
                      : "text-light_gray"
                  }`}
                >
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
