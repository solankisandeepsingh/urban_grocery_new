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
  let menuRef = useRef(null);
  let deskRef = useRef(null);
  let mobRef = useRef(null);
  const userButtonClicks = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isValidImg, setisValidImg] = useState(false);
  const {
    userInfo: { user_id, name, profile, mobile },
    setUserInfo,
  } = useUserStore();

  const [profileView, setProfileView] = useState(false);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (menuRef.current) {
  //       if (!menuRef.current.contains(e.target)) {
  //         setIsOpen(false);
  //         setMobileOpen(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrollingDown = window.scrollY > 0;
  //     setShowSearch(!isScrollingDown);
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the modal box
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !deskRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setMobileOpen(false);
    }
  };
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
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
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
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
    // setLoggedIn(false);
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
              className="h-6 md:w-[150px] md:h-[50px] md:ml-8 sm:px-6 mr-3 mt-2 sm:h-9 bg-white cursor-pointer"
              alt="Flowbite Logo"
              onClick={handleClickHome}
            />
          </div>
          {NavbarOpen && (
            <div className="">
              <div
                // className="relative xs:my-2 ml-[-145px]  md:hidden sm:hidden"
                className="relative xs:my-2 ml-[-100px]  md:hidden sm:hidden"
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
              >
                {!(user_id == false) ? (
                  <div
                    className="flex items-center justify-center text-center h-[30px] rounded-lg md:px-2 md:mt-5 xs:mt-3 bg-white"
                    onClick={() => {
                      setMobileOpen(!mobileOpen);
                    }}
                  >
                    {isValidImg ? (
                      <img
                        src={profile}
                        className="xs:text-2xl w-[30px] h-[30px] mx-[5px] text-lime object-cover rounded-full cursor-pointer"
                        alt=""
                      />
                    ) : (
                      <FaUserCircle className=" xs:text-3xl text-lime  md:text-2xl mr-1 cursor-pointer" />
                    )}

                    {name}
                    <div className="md:mt-1 xs:mt-1 bg-white ">
                      <FaCaretDown className="bg-white" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="xs:w-20  md:w-24 h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-3  bg-white"
                    onClick={() => {
                      console.log("working");
                      setOpenLogin(true);
                    }}
                    ref={mobRef}
                  >
                    {/* <button className=" text-white font-bold bg-lime md:p-2 md:mb-2.5  xs:p-1  xs:mr-16 xs:mt-3  rounded-lg sm:text-md md:text-md text-center">
                    {name}
                  </button> */}
                    <button
                      className="flex justify-center items-center text-center my-2.5 text-lime"
                      // onClick={() => setMobileOpen((prev) => !prev)}
                    >
                      {name}
                    </button>
                  </div>
                )}

                {openLogin && <Login setOpenLogin={setOpenLogin} />}

                {mobileOpen && (
                  <div
                    className="top-0 p-5 pt-0 left-[-140px] mt-2 w-56 shadow-lg rounded-lg bg-white  xs:my-[39px] md:ml-[980px] sm:ml-[400px] xs:ml-[100px] z-10 absolute px-4"
                    ref={menuRef}
                  >
                    <ul className="mt-4 bg-white ">
                      <li className=" bg-white cursor-pointer">
                        <p className="bg-white mt-4 sm:text-2xl md:text-lg">
                          My Accountt
                        </p>
                        <p className="bg-white sm:text-2xl md:text-[15px] font-bold">
                          {mobile}
                        </p>
                        <hr />
                      </li>

                      <li className="bg-white  cursor-pointer">
                        <NavLink to="/orderhistory">
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm  mt-4"
                          >
                            My Orders
                          </p>
                        </NavLink>
                      </li>
                      <li className="  bg-white cursor-pointer">
                        <NavLink to={"/address"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            Saved Address
                          </p>
                        </NavLink>
                      </li>
                      <li className="  bg-white cursor-pointer">
                        <NavLink to={"/favpage"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className=" sm:text-lg md:text-sm mt-4"
                          >
                            Favourties
                          </p>
                        </NavLink>
                      </li>
                      <li className="  bg-white cursor-pointer">
                        <NavLink to={"/profile"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            My Profile
                          </p>
                        </NavLink>
                      </li>
                      <li className=" bg-white cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <NavLink to={"/wallet"}>
                            <p
                              onClick={() => setMobileOpen(false)}
                              className="bg-white sm:text-lg md:text-sm"
                            >
                              My Wallet
                            </p>
                          </NavLink>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm"
                          >
                            ₹500
                          </p>
                        </div>
                      </li>
                      <li className="bg-white cursor-pointer">
                        <NavLink to={"/faq"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            FAQ
                          </p>
                        </NavLink>
                      </li>
                      <li className="bg-white cursor-pointer">
                        <NavLink to={"/about"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            About_Us
                          </p>
                        </NavLink>
                      </li>
                      <li className="bg-white cursor-pointer">
                        <NavLink to={"/contact"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            Contact_Us
                          </p>
                        </NavLink>
                      </li>
                      <li className="bg-white cursor-pointer">
                        <NavLink to={"/privacy"}>
                          <p
                            onClick={() => setMobileOpen(false)}
                            className="bg-white sm:text-lg md:text-sm mt-4"
                          >
                            Privacy
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
            </div>
          )}

          <div className="flex md:order-2 z-10 xs:justify-between bg-white  justify-center gap-1 items-center mr-5">
            {/* {showSearch ? null : (
              // <div className="md:hidden xs:visible rounded-lg bg-lime w-8 h-8 xs:w-8 xs:h-8 xs:mt-3.5 xs:mx-2">
              <div className="md:hidden xs:visible rounded-lg bg-skyblue w-8 h-8 xs:w-8 xs:h-8 xs:mt-3.5 xs:mx-2">
                <FaSistrix
                  className="xs:mx-3 xs:my-[-2px] text-2xl text-lime"
                  onClick={handleShowSearchBar}
                />
              </div>
            )} */}
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
                    // className="flex sm:mr-3 items-center h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-5 xs:mt-3 bg-white"
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
                      console.log("working");
                      setOpenLogin(true);
                    }}
                  >
                    {/* <button className=" text-white font-bold bg-lime md:p-2 md:mb-2.5  xs:p-1  xs:mr-16 xs:mt-3  rounded-lg sm:text-md md:text-md text-center"> */}
                    {/* <button className=" text-white font-bold bg-lime  rounded-lg sm:text-md md:text-md text-center"> */}
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
                    className="top-0 p-5 pt-0 right-0 mt-2 w-56 shadow-lg rounded-lg bg-[#f5f4f4]  xs:mt-[73px] md:ml-[980px] md:my-[54px] border border-light_gray sm:ml-[400px] xs:ml-[100px] z-10 absolute px-4"
                    ref={menuRef}
                  >
                    <ul className="mt-">
                      <li className="cursor-pointer">
                        <p className="mt-4 sm:text-2xl md:text-lg">
                          My Account
                        </p>
                        <p className="sm:text-2xl md:text-[15px] font-bold">
                          {mobile}
                        </p>
                        <hr />
                      </li>

                      <li className="cursor-pointer">
                        <NavLink to={"/orderhistory"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className="sm:text-lg md:text-sm mt-4"
                          >
                            My Orders
                          </p>
                        </NavLink>
                      </li>

                      <li className="cursor-pointer">
                        <NavLink to={"/address"}>
                          <p
                            onClick={() => setIsOpen(false)}
                            className=" sm:text-lg md:text-sm mt-4"
                          >
                            Saved Address
                          </p>
                        </NavLink>
                      </li>

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

                      <li className="  cursor-pointer">
                        <p
                          onClick={handleProfile}
                          className="sm:text-lg md:text-sm mt-4"
                        >
                          My Profile
                        </p>
                      </li>

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

                      <li className=" cursor-pointer">
                        <p
                          onClick={handleLogout}
                          className="sm:text-lg md:text-sm mt-4 cursor-pointer"
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

      {profileView && <MyProfile setProfileView={setProfileView} />}
    </div>
  );
};
