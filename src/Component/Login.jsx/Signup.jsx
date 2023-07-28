import React, { useState } from "react";
import {
  FaPassport,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Signup = ({ setOpenLogin,phoneNumber, setShowRegisterForm , setLoginForm}) => {
  const [userRegistraion, setUserRegistration] = useState({
    name: "",
    password: "",
    // phoneNumber: "",
  });
  const [closeSignup, setCloseSignUp] = useState(true);
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();


  const handleUserSignUp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserRegistration({ ...userRegistraion, [name]: value });
  };

  const handleSingUp = (e) => {
    e.preventDefault();

    if (
      !userRegistraion.name ||
      !userRegistraion.password 
   
    ) {
      toast.error("Please enter all the fields");
      return;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    let formData = new FormData();
    formData.append("accesskey", "90336");
    formData.append("type", "register");
    formData.append("name", userRegistraion.name);
    // formData.append("email", "singh@yahoo.com");
    formData.append("password", userRegistraion.password);
    // formData.append("country_code", "91");
    formData.append("mobile", phoneNumber);
    // formData.append("mobile", "+917042719919");
    // formData.append("fcm_id", "YOUR_FCM_ID");
    // formData.append("dob", "08-09-1993");
    // formData.append("city_id", "1");
    // formData.append("area_id", "1");
    // formData.append("street", "Vijay");
    // formData.append("pincode", "191104");
    // formData.append("api_key", "abc@123");
    // formData.append("referral_code", "QCZYBEXHK5");
    // formData.append("latitude", "44.968046");
    // formData.append("longitude", "-f");
    setisLoading(true);

    axios
    .post(
      "https://grocery.intelliatech.in/api-firebase/user-registration.php",
      formData,
      config
    )
    .then((res) => {
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.message);
        setisLoading(false);
        setLoginForm(true);
        setShowRegisterForm(false);
      } else {
        toast.success("User registered successfully");
        setLoginForm(true);
        setShowRegisterForm(false);
        setisLoading(false);
      }
    })
    .catch((err) => {
      toast.error("An error occurred. Please try again.");
      console.log("already registered", err);
      setisLoading(false);
    });
    setUserRegistration({
      name: "",
      password: "",
      phoneNumber: "",
    });
  };

  const handleCloseSignUp = () => {
    // setCloseSignUp(false);
    setCloseSignUp((prev) => !prev);
    setOpenLogin(false);
    // setLoginFormModals(false);
    // navigate("/");
  };



  return (
    <div>
      <>
        {closeSignup && (
          <>
            <ToastContainer />
            <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
              <div className="bg-white rounded w-[505px] h-[440px] top-[5%] left-[5%]">
                <div className="flex justify-center items-center relative">
                  <div className="container relative  opacity-70">
                    <button
                      className="absolute top-[5%] right-[5%]"
                      onClick={handleCloseSignUp}
                    >
                      <AiOutlineCloseCircle className="text-red text-2xl hover:opacity-50" />
                    </button>
                    <div className="w-full p-8 md:px-12 mr-auto rounded-2xl shadow-2xl">
                      <div className="mb-4 mr-1">
                        <img
                          src="http://grocery.intelliatech.in/dist/img/logo.png"
                          className="h-3 md:w-[70px] md:h-[60px] sm:h-9 bg-white "
                          alt="Flowbite Logo"
                        />
                      </div>
                      <div className="flex justify-between">
                        <h1 className="font-bold uppercase text-3xl">
                          Signup :
                        </h1>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <form className="bg-white md:rounded px-8 pt-2 pb-4">
                          <div className="mb-6 items-center flex ml-20 xs:ml-[12px]">
                            <FaUserCircle className="text-[20px] text-gryColour mt-[-15px]" />
                            <input
                              className=" appearance-none border-b border-b-light_gray rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="text"
                              type="text"
                              name="name"
                              placeholder="Enter Your Name"
                              value={userRegistraion.name}
                              onChange={handleUserSignUp}
                            />
                          </div>

                          <div className="mb-6 items-center flex ml-20 xs:ml-[12px]">
                            <FaPassport className="text-[20px] text-gryColour mt-[-15px]" />
                            <input
                              className=" appearance-none border-b border-b-light_gray rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              type="password"
                              name="password"
                              placeholder="Enter Your Password"
                              value={userRegistraion.password}
                              onChange={handleUserSignUp}
                            />
                          </div>

                          <div className="">
                            <button
                              className="rounded-full bg-lime xs:rounded-lg xs:text-xs  xs:h-8 md:w-full xs:w-full md:h-10 md:text-base md:font-medium inline-block hover:bg-orange font-medium ..."
                              onClick={handleSingUp}
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};
