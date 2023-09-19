import React from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    // <div className="flex flex-col ">

    //   <div>
    //     <ul className="list-none m-0  overflow-hidden ">
    //       <li className="inline">
    //         <NavLink className="px-2 border-r border-[#f3f3f] font-bold cursor-pointer" to="/">
    //           Home
    //         </NavLink>
    //       </li>
    //       <li className="inline">
    //         <NavLink className="px-2  border-r border-[#f3f3f] font-bold cursor-pointer hover:" to={"/about"}>
    //         About
    //         </NavLink>
    //       </li>
    //       <li className="inline">
    //         <NavLink className="px-2  border-r border-[#e9e4e4] font-bold cursor-pointer" to={"/favpage"}>
    //           Favourites
    //         </NavLink>
    //       </li>
    //       <li className="inline">
    //         <NavLink className="px-2 font-bold cursor-pointer" to={"/contact"}>
    //          Contact
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   <p className="py-3">&copy; 2023 Urban Grocery. All rights reserved.</p>
    //   <p>Terms of Service | Privacy Policy</p>
    // </div>

    <footer>
      <div className="bg-offWhite py-4 text-gray-400">
        <div className="container px-4 mx-auto">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">
                  Company
                </h2>
              </div>
              <ul className="list-none m-0  overflow-hidden ">
                <li className="inline">
                  <NavLink
                    className="px-2 border-r border-[#f3f3f] font-bold cursor-pointer"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="inline">
                  <NavLink
                    className="px-2  border-r border-[#f3f3f] font-bold cursor-pointer hover:"
                    to={"/about"}
                  >
                    About
                  </NavLink>
                </li>

                <li className="inline">
                  <NavLink
                    className="px-2 font-bold cursor-pointer"
                    to={"/contact"}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">
                  Blog
                </h2>
              </div>
              <div className="text-[#312f2f] font-bold">
                <p>
                  Urban Grocery is one of the most selling and trending Grocery,
                  Food Delivery,{" "}
                </p>
                <p>
                  Fruits & Vegetable store, Full Android eCommerce & Website.
                </p>
              </div>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">
                  Connect With Us
                </h2>
              </div>
              <div className="flex justify-between">
                <FaFacebook className="text-[25px]" />
                <FaTwitter className="text-[25px]" />
                <FaInstagram className="text-[25px]" />
                <FaGoogle className="text-[25px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-700 py-4 text-gray-100">
        <div className="text-center font-bold text-[#3b3a3a]">
          <p className="">&copy; 2023 Urban Grocery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
