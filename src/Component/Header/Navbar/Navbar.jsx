import React, { useState, useEffect, useRef } from "react";
import Search from "../Search/Search";
import MyCart from "../../MyCart/MyCart";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCaretDown, FaSistrix, FaUserCircle } from "react-icons/fa";
import { useUserStore } from "../../zustand/useUserStore";
import { Login } from "../../Login.jsx/Login";
import { MyProfile } from "../../Profile/MyProfile";

export const Navbar = ({
  setData,
  addItem,
  setAddItem,
  formData,
  setFormdata,
  setShowSearchBar,
  setName,
  NavbarOpen,
  setNavbarOpen,
  dispatchLogin,
  setUser_id,
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(true);
  let menuRef = useRef(null);
  let deskRef = useRef(null);
  let mobRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isValidImg, setisValidImg] = useState(false);
  const {
    userInfo: { user_id, name, profile, mobile },
    setUserInfo,
  } = useUserStore();

  const [profileView, setProfileView] = useState(false);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !deskRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowSearch(true);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = profile;

    img.onload = () => {
      setisValidImg(true);
    };

    img.onerror = () => {
      setisValidImg(false);
    };
  }, [profile]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleShowSearchBar = () => {
    setShowSearchBar(true);

    navigate("/search");
    scrollToTop();
  };
  const handleClickHome = () => {
    setNavbarOpen(true);
    navigate("/");
  };

  const handleLogout = () => {
    setUserInfo({ user_id: "", name: "Login" });
    setIsOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    setIsOpen(false);
    setProfileView((prev) => !prev);
  };
  return (
    <div className="">
      <nav className=" px-2  sm:px-0 fixed w-full z-20 top-0 left-0 border-b border-light_gray shadow-sm bg-white">
        <div className="bg-white flex flex-wrap items-center justify-between mx-auto ">
          <div>
            <img
              src="http://grocery.intelliatech.in/dist/img/logo.png"
              className="h-6 md:w-[180px] md:h-[60px] md:ml-8 sm:px-6 mr-3 mt-2 sm:h-9 bg-white cursor-pointer"
              alt=""
              onClick={handleClickHome}
            />
          </div>

          {NavbarOpen && (
            <div className="relative hidden xs:block md:hidden sm:hidden">
              {!(user_id == false) ? (
                <div
                  className="flex justify-center items-center hover:border border border-[white] hover:border-light_gray hover:bg-[#ff9f9]  mr-3 text-center cursor-pointer hover:shadow-sm rounded-br-[50px]  rounded-tr-[50px]  rounded-l-[100px]"
                  onClick={() => {
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  {isValidImg ? (
                    <img
                      src={profile}
                      className="xs:text-3xl w-[40px] h-[40px]  ml-[-60px]  text-lime object-cover rounded-full md:text-[2px] mr-1 cursor-pointer"
                      alt=""
                    />
                  ) : (
                    <FaUserCircle className=" xs:text-3xl text-lime md:text-2xl mr-1 cursor-pointer" />
                  )}
                  <div className="">{name}</div>

                  <div className="">
                    <FaCaretDown className="" />
                  </div>
                </div>
              ) : (
                <div
                  className="xs:w-20  md:w-24 h-[32px]  rounded-lg md:ml-[-75px] md:px-4 !leading-tight  bg-white"
                  onClick={() => {
                    setOpenLogin((prev) => !prev);
                  }}
                >
                  <button className=" text-lime items-center flex font-bold rounded  p-3 py-1.5 ml-[-70px] ">
                    {name}
                  </button>
                </div>
              )}

              {openLogin && <Login setOpenLogin={setOpenLogin} />}

              {mobileOpen && (
                <div
                  className="top-0 p-5 pt-0 right-0 xs:mr-[-22px]  w-56 shadow-lg rounded-lg bg-[#f5f4f4]  xs:mt-[44px] z-10 absolute px-4"
                  ref={mobRef}
                >
                  <ul className="">
                    <li className="cursor-pointer">
                      <p className="mt-4 sm:text-2xl md:text-lg">My Account</p>
                      <p className="sm:text-2xl md:text-[15px] font-bold">
                        {mobile}
                      </p>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>

                    <li className="cursor-pointer">
                      <NavLink to={"/myorder"}>
                        <p className="sm:text-lg md:text-sm mt-4">My Orders</p>
                      </NavLink>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>

                    <li className="cursor-pointer">
                      <NavLink to={"/address"}>
                        <p className=" sm:text-lg md:text-sm mt-4">
                          My Address
                        </p>
                      </NavLink>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>
                    <li className="  cursor-pointer">
                      <NavLink to={"/favpage"}>
                        <p className=" sm:text-lg md:text-sm mt-4">
                          Favourties
                        </p>
                      </NavLink>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>
                    <li className="  cursor-pointer">
                      <p
                        onClick={handleProfile}
                        className="sm:text-lg md:text-sm mt-4"
                      >
                        My Profile
                      </p>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>
                    <li className=" cursor-pointer">
                      <div className="flex justify-between mt-4  ">
                        <NavLink to={"/wallet"}>
                          <p className="sm:text-lg md:text-sm">My Wallet</p>
                        </NavLink>
                        <p className="sm:text-lg md:text-sm">₹500</p>
                      </div>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>
                    <li className="cursor-pointer">
                      <NavLink to={"/faq"}>
                        <p className=" sm:text-lg md:text-sm mt-4">FAQ</p>
                      </NavLink>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>

                    <li className=" cursor-pointer">
                      <p
                        onClick={handleLogout}
                        className="sm:text-lg md:text-sm mt-4 cursor-pointer"
                      >
                        Log Out
                      </p>
                    </li>
                    <div className="border-b border-light_gray my-2 "></div>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex md:order-2 z-10 xs:justify-between bg-white  justify-center gap-1 items-center mr-5">
            <div className="md:hidden xs:visible rounded-lg bg-skyblue flex items-center justify-center xs:w-10 xs:h-10 ">
              <FaSistrix
                className=" text-2xl text-lime"
                onClick={handleShowSearchBar}
              />
            </div>

            {NavbarOpen && (
              <div className="relative hidden md:block sm:block">
                {!(user_id == false) ? (
                  <div
                    className="flex justify-center items-center hover:border border border-[white] hover:border-light_gray hover:bg-[#ff9f9]  mr-3 text-center cursor-pointer hover:shadow-sm rounded-br-[50px]  rounded-tr-[50px]  rounded-l-[100px]"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    ref={deskRef}
                  >
                    {isValidImg ? (
                      <img
                        src={profile}
                        className="xs:text-3xl w-[40px] h-[40px]  text-lime object-cover rounded-full md:text-[2px] mr-1 cursor-pointer"
                        alt=""
                      />
                    ) : (
                      <FaUserCircle className=" xs:text-3xl text-lime  md:text-2xl mr-1 cursor-pointer" />
                    )}
                    <div className="">{name}</div>

                    <div className="">
                      <FaCaretDown className="" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="xs:w-20  md:w-24 h-[32px]  rounded-lg md:ml-[-75px] md:px-4 !leading-tight  bg-white"
                    onClick={() => {
                      // setOpenLogin(true);
                      setOpenLogin((prev) => !prev);
                    }}
                  >
                    <button className=" text-lime items-center flex font-bold rounded  p-3 py-1.5 ">
                      {name}
                    </button>
                  </div>
                )}

                {openLogin && (
                  <Login setOpenLogin={setOpenLogin} setIsOpen={setIsOpen} />
                )}

                {isOpen && (
                  <div
                    className="top-0 p-5 pt-0 right-0 mt-2 w-56 shadow-lg rounded-lg bg-[#f5f4f4]  xs:mt-[73px] md:ml-[980px] md:my-[49px] sm:ml-[400px] xs:ml-[100px] z-10 absolute px-4"
                    ref={menuRef}
                  >
                    <ul className="">
                      <li className="cursor-pointer">
                        <p className="mt-4 sm:text-2xl md:text-lg">
                          My Account
                        </p>
                        <p className="sm:text-2xl md:text-[15px] font-bold">
                          {mobile}
                        </p>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>

                      <li className="cursor-pointer">
                        <NavLink to={"/myorder"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="sm:text-lg md:text-sm mt-4"
                          >
                            My Orders
                          </p>
                        </NavLink>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>

                      <li className="cursor-pointer">
                        <NavLink to={"/address"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className=" sm:text-lg md:text-sm mt-4"
                          >
                            My Address
                          </p>
                        </NavLink>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>
                      <li className="  cursor-pointer">
                        <NavLink to={"/favpage"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className=" sm:text-lg md:text-sm mt-4"
                          >
                            Favourties
                          </p>
                        </NavLink>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>
                      <li className="  cursor-pointer">
                        <p
                          onClick={handleProfile}
                          className="sm:text-lg md:text-sm mt-4"
                        >
                          My Profile
                        </p>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>
                      <li className=" cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <NavLink to={"/wallet"}>
                            <p
                              onClick={() => setIsOpen(false)}
                              className="sm:text-lg md:text-sm"
                            >
                              My Wallet
                            </p>
                          </NavLink>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="sm:text-lg md:text-sm"
                          >
                            ₹500
                          </p>
                        </div>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>
                      <li className="cursor-pointer">
                        <NavLink to={"/faq"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className=" sm:text-lg md:text-sm mt-4"
                          >
                            FAQ
                          </p>
                        </NavLink>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>

                      <li className=" cursor-pointer">
                        <p
                          onClick={handleLogout}
                          className="sm:text-lg md:text-sm mt-4 cursor-pointer"
                        >
                          Log Out
                        </p>
                      </li>
                      <div className="border-b border-light_gray my-2 "></div>
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
                dispatchLogin={dispatchLogin}
                setUser_id={setUser_id}
              />
            )}
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-0 bg-white">
            {NavbarOpen && <Search setData={setData} setName={setName} />}
          </div>
        </div>
      </nav>

      {profileView && <MyProfile setProfileView={setProfileView} />}
    </div>
  );
};
