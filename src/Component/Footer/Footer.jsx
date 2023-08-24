import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex flex-col ">
      
      <div>
        <ul className="list-none m-0  overflow-hidden ">
          <li className="inline">
            <NavLink className="px-2 border-r border-[#f3f3f] font-bold cursor-pointer" to="/">
              Home
            </NavLink>
          </li>
          <li className="inline">
            <NavLink className="px-2  border-r border-[#f3f3f] font-bold cursor-pointer hover:" to={"/about"}>
            About
            </NavLink>
          </li>
          <li className="inline">
            <NavLink className="px-2  border-r border-[#e9e4e4] font-bold cursor-pointer" to={"/favpage"}>
              Favourites
            </NavLink>
          </li>
          <li className="inline">
            <NavLink className="px-2 font-bold cursor-pointer" to={"/contact"}>
             Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <p className="py-3">&copy; 2023 Urban Grocery. All rights reserved.</p>
      <p>Terms of Service | Privacy Policy</p>
    </div>
  );
};
