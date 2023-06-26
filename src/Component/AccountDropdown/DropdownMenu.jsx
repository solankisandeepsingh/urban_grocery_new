import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_TOKEN } from "../Token/Token";

function DropdownMenu({
  isOpen,
  setIsOpen,
  setLoggedIn,
  dispatchLogin,
  loggedIn,
}) {
  const navigate = useNavigate();
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   // dispatchLogin({type:"LOGOUT"})
  //   setLoggedIn(false);
  //   setIsOpen(false);
  //   navigate("/")
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatchLogin({ type: "LOGOUT" });
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className="rounded-lg  bg-white xs:mt-[58px] md:ml-[980px] sm:ml-[400px] xs:ml-[100px] z-10 fixed w-60 px-4"
        >
          <NavLink to={"/aside"}>
            <p className="bg-white mt-4 sm:text-2xl md:text-lg">My Account</p>
          </NavLink>
          <p className="text-xs font-thin text-secondary bg-white sm:text-lg md:text-sm">
            6262771508
          </p>
          <div className="text-xs font-thin my-3 text-secondary bg-white ">
            <NavLink to={"/login"}>
              <p
                onClick={() => setIsOpen(false)}
                className="bg-white sm:text-lg md:text-sm mt-4"
              >
                LogIn
              </p>
            </NavLink>
            <NavLink to={"/myorder"}>
              <p
                onClick={() => setIsOpen(false)}
                className="bg-white sm:text-lg md:text-sm mt-4"
              >
                My Orders
              </p>
            </NavLink>
            <NavLink to={"/address"}>
              <p
                onClick={() => setIsOpen(false)}
                className="bg-white sm:text-lg md:text-sm mt-4"
              >
                Saved Address
              </p>
            </NavLink>
            <div className="flex justify-between mt-4 bg-white ">
              <NavLink to={"/wallet"}>
                <p
                  onClick={() => setIsOpen(false)}
                  className="bg-white sm:text-lg md:text-sm"
                >
                  My Wallet
                </p>
              </NavLink>
              <p
                onClick={() => setIsOpen(false)}
                className="bg-white sm:text-lg md:text-sm"
              >
                ₹500
              </p>
            </div>
            <NavLink to={"/faq"}>
              <p
                onClick={() => setIsOpen(false)}
                className="bg-white sm:text-lg md:text-sm mt-4"
              >
                FAQ
              </p>
            </NavLink>
            {loggedIn ? (
              <p
                onClick={handleLogout}
                className="bg-white sm:text-lg  md:text-sm mt-4 cursor-pointer "
              >
                Log Out
              </p>
            ) : (
              <p
                onClick={handleLogout}
                className="bg-white sm:text-lg  md:text-sm mt-4 cursor-pointer "
              >
                Log Out
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DropdownMenu;
