import React from "react";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AccountButton({
  isOpen,
  setIsOpen,
  loggedUsername,
  loggedIn,
  dispatchLogin,
  setLoggedIn,
}) {
  const navigate = useNavigate();
   
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatchLogin({ type: "LOGOUT" });
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {loggedIn ? (
        <div
          className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-3 xs:mt-3 bg-white"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FaUserCircle className="xs:mt-1 xs:text-3xl text-lime md:mt-1.5 md:text-2xl mr-1 cursor-pointer" />
          <button
            className=" text-black sm:text-md md:text-md mt-2"
            onClick={handleLogout}
          >
            {loggedUsername}
          </button>
          <div className="md:mt-1 xs:mt-1 bg-white ">
            <FaCaretDown className="bg-white md:mt-2 xs:mt-2 " />
          </div>
        </div>
      ) : (
        
        <div
          className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] md:ml-[-145px] rounded-lg md:px-2 md:mt-3 xs:mt-3 bg-white"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FaUserCircle className="xs:mt-1 xs:text-3xl text-lime md:mt-1.5 md:text-2xl mr-1 cursor-pointer" />
          <button className=" text-black sm:text-md md:text-md mt-2">
            User
          </button>
          <div className="md:mt-1 xs:mt-1 bg-white ">
            <FaCaretDown className="bg-white md:mt-2 xs:mt-2 " />
          </div>
        </div>
      )}
    </>
  );
}

export default AccountButton;
