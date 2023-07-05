import React, { useState, useEffect, useRef } from "react";
import Search from "../Search/Search";
import MyCart from "../../MyCart/MyCart";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCaretDown, FaSistrix, FaUserCircle } from "react-icons/fa";
import { useUserStore } from "../../zustand/useUserStore";
import { Login } from "../../Login.jsx/Login";

export const Navbar = ({
  setData,
  addItem,
  setAddItem,
  formData,
  setFormdata,
  setShowSearchBar,
  // name,
  setName,
  loggedUsername,
  NavbarOpen,
  setNavbarOpen,
  dispatchLogin,
  // setLoggedIn,
  setUser_id,
  // loggedIn,
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(true);
  let menuRef = useRef();
  const userButtonClicks = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const {
    userInfo: { user_id, name },
    setUserInfo,
  } = useUserStore();
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
  // const {allCartItems} = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      const isScrollingDown = window.scrollY > 0;
      setShowSearch(!isScrollingDown);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowSearchBar = () => {
    setShowSearchBar(true);
    navigate("/search");
  };
  const handleClickHome = () => {
    setNavbarOpen(true);
    navigate("/");
  };
  const handleDropdown = (e) => {
    e.preventDefault();
    if (!isOpen) {
      setIsOpen(true);
      userButtonClicks.current += 1;
      setIsOpen(userButtonClicks.current % 2 === 0);
    }
  };

  const handleLogout = () => {
    setUserInfo({ user_id: 14, name: "Login/Signup" });
    // setLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="">
      <nav className=" px-2 sm:px-4 fixed w-full z-20 top-0 left-0 border-b border-light_gray shadow-sm bg-white">
        <div className="bg-white flex flex-wrap items-center justify-between mx-auto ">
          <img
            src="http://grocery.intelliatech.in/dist/img/logo.png"
            className="h-6 md:w-[150px] md:h-[50px] md:ml-8 mr-3 mt-2 sm:h-9 bg-white cursor-pointer"
            alt="Flowbite Logo"
            onClick={handleClickHome}
          />

          <div className="flex md:order-2 z-10 xs:justify-between bg-white">
            {showSearch ? null : (
              <div className="md:hidden xs:visible rounded-lg bg-lime w-8 h-8 xs:w-8 xs:h-8 xs:mt-3.5 xs:mx-2">
                <FaSistrix
                  className=" text-white m-1 text-2xl bg-lime"
                  onClick={handleShowSearchBar}
                />
              </div>
            )}

            {NavbarOpen && (
              <div className="relative">
                {!(user_id === 14) ? (
                  <div
                    className="flex sm:mr-3 items-center h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-5 xs:mt-3 bg-white"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <FaUserCircle className=" xs:text-3xl text-lime  md:text-2xl mr-1 cursor-pointer" />
                    {/* <button className=" text-black sm:text-md md:text-md mt-2"> */}
                      {name}
                    {/* </button> */}
                    <div className="md:mt-1 xs:mt-1 bg-white ">
                      <FaCaretDown className="bg-white" />
                    </div>
                  </div>
                ) : (
                    <div
                      className="xs:w-20  md:w-24 h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-3  bg-white"
                      onClick={() => {
                        setOpenLogin(true);
                      }}
                    >
                      <button className=" text-white font-bold bg-lime p-3 rounded-lg sm:text-md md:text-md text-center">
                        {name}
                      </button>
                      {/* <div className="md:mt-1 xs:mt-1 bg-white ">
                        <FaCaretDown className="bg-white md:mt-2 xs:mt-2 " />
                      </div> */}
                    </div>
                )}

                {openLogin && 
                  <Login setOpenLogin= {setOpenLogin}/>
                }

                {isOpen && (
                  <div
                    className="top-0 p-5 pt-0 right-0 mt-2 w-56 shadow-lg rounded-lg bg-white  xs:mt-[73px] md:ml-[980px] sm:ml-[400px] xs:ml-[100px] z-10 absolute px-4"
                    ref={menuRef}
                  >
                    <ul className="mt-8 bg-white">
                      <li className=" bg-white cursor-pointer">
                        <p className="bg-white mt-4 mb-3 sm:text-2xl md:text-lg">
                          My Account
                        </p>
                        <hr />
                      </li>
                      {/* <li className=" bg-white cursor-pointer">
                        <NavLink to={"/login"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            LogIn
                          </p>
                        </NavLink>
                      </li> */}
                      <li className="bg-white  cursor-pointer">
                        <NavLink to={"/myorder"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            My Orders
                          </p>
                        </NavLink>
                      </li>
                      <li className="  bg-white cursor-pointer">
                        <NavLink to={"/address"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            Saved Address
                          </p>
                        </NavLink>
                      </li>
                      <li className=" bg-white cursor-pointer">
                        <div className="flex justify-between mt-4  ">
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
                      </li>
                      <li className="bg-white cursor-pointer">
                        <NavLink to={"/faq"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            FAQ
                          </p>
                        </NavLink>
                      </li>

                      <li className="bg-white cursor-pointer">
                        <p
                          onClick={handleLogout}
                          className="bg-white sm:text-lg md:text-sm mt-4 cursor-pointer"
                        >
                          Log Out
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {NavbarOpen && (
              <MyCart
                addItem={addItem}
                setAddItem={setAddItem}
                formData={formData}
                setFormdata={setFormdata}
                setData={setData}
                setNavbarOpen={setNavbarOpen}
                // setLoggedIn={setLoggedIn}
                dispatchLogin={dispatchLogin}
                // user_id={user_id}
                setUser_id={setUser_id}
                // loggedIn={loggedIn}
                // handleLogin={handleLogin}
              />
            )}
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-0 bg-white">
            {NavbarOpen && <Search setData={setData} setName={setName} />}
          </div>
        </div>
      </nav>
    </div>
  );
};
