import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaMicrosoft,
  FaPassport,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderState } from "../zustand/useLoaderState";

export const Signup = ({ setOpenLogin }) => {
  const [userRegistraion, setUserRegistration] = useState({
    name: "",
    password: "",
    phoneNumber: "",
  });
  const [SignUpPhone, setSignUpPhone] = useState([]);
  const [closeSignup, setCloseSignUp] = useState(true);
  const navigate = useNavigate();
  const { setisLoading } = useLoaderState();

  const handleUserSignUp = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserRegistration({ ...userRegistraion, [name]: value });
  };

  const handleSingUp = (e) => {
    e.preventDefault();

    if (
      !userRegistraion.name ||
      !userRegistraion.password ||
      !userRegistraion.phoneNumber
    ) {
      toast.error("Please enter all the fields");
      return;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    let formData = new FormData();
    formData.append("accesskey", "90336");
    formData.append("type", "register");
    formData.append("name", userRegistraion.name);
    // formData.append("email", "singh@yahoo.com");
    formData.append("password", userRegistraion.password);
    formData.append("country_code", "91");
    formData.append("mobile", userRegistraion.phoneNumber);
    formData.append("fcm_id", "YOUR_FCM_ID");
    formData.append("dob", "08-09-1993");
    formData.append("city_id", "1");
    formData.append("area_id", "1");
    formData.append("street", "Vijay");
    formData.append("pincode", "191104");
    formData.append("api_key", "abc@123");
    formData.append("referral_code", "QCZYBEXHK5");
    formData.append("latitude", "44.968046");
    formData.append("longitude", "-f");
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-registration.php",
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setSignUpPhone([...SignUpPhone, userRegistraion]);
        toast.success("User successfully registered.");
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
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

  const handleLoginGmail = () => {
    navigate("/");
  };

  return (
    <div>
      <>
        {closeSignup && (
          <>
            <ToastContainer />
            <div className="fixed z-50 top-0  left-0 w-full h-full flex justify-center items-center border rounded-lg bg-black bg-opacity-75">
              <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white rounded-lg">
                <div className="px-5 py-2 flex justify-between text-center items-center rounded-sm-y">
                  <h3 className="text-2xl font-semibold text-center">
                    Register{" "}
                  </h3>

                  <span
                    className="text-2xl text-graycol cursor-pointer"
                    onClick={handleCloseSignUp}
                  >
                    x
                  </span>
                </div>
                <div class="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light_gray after:mt-0.5 after:flex-1 after:border-t after:border-light_gray">
                  <p class="mx-4 mb-0 text-center font-semibold">
                    OR
                  </p>
                </div>

                <div>
                  <button
                    class="mb-3 flex gap-2 w-[300px] m-4 text-white uppercase  bg-Crayola_blue items-center justify-center rounded-xl  bg-primary px-7 pb-2.5 pt-3 text-center "
                    
                  >
                    <FaFacebookF  className="font-bold text-[20px]"/>
                    Continue with Facebook
                  </button>
                </div>
                <div className="mr-4">
                  <button
                    class="mb-3 flex w-[300px] m-4 gap-2 text-white uppercase  bg-gmail_color items-center justify-center rounded-xl  px-7 pb-2.5 pt-3 text-center "
                   
                  >
                    <FaGoogle className="font-bold text-[20px]" />
                    Continue with Gmail
                  </button>
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
                      <FaPhoneAlt className="text-[20px] text-gryColour mt-[-15px]" />
                      <input
                        className=" appearance-none border-b border-b-light_gray rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="num"
                        type="num"
                        name="phoneNumber"
                        placeholder="Enter Your Number"
                        value={userRegistraion.phoneNumber}
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

                    {/* <h2 className="text-center text-xl font-semibold md:mt-2 xs:mt-2">
                      Or
                    </h2>
                    <div className="md:mt-4 xs:mt-2">
                      <ul className="font-medium">
                        <li className="border border-light_gray mb-2 shadow-lg">
                          <a
                            to="/"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={handleLoginGmail}
                          >
                            <FaEnvelope className="text-darkgray text-lg" />
                            <span className="ml-3 text-light_gray xs:text-xs font-light">
                              Continue With Google
                            </span>
                          </a>
                        </li>
                        <li className="border border-light_gray mb-2 shadow-lg">
                          <NavLink to={"/"}>
                            <a
                              to="/"
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <FaFacebook className="text-darkgray text-lg" />
                              <span className="ml-3 text-light_gray xs:text-xs font-light">
                                Continue With Facebook
                              </span>
                            </a>
                          </NavLink>
                        </li>
                      </ul>
                    </div> */}
                    {/* <div className="flex border-t border-solid border-light_gray rounded-b"></div> */}
                  </form>
                </div>
              </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </>
    </div>
  );
};
