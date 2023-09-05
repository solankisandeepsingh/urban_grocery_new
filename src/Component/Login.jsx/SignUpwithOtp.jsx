import React, { useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { FaMobile, FaMobileAlt, FaPhone, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import { Signup } from "./Signup";
import "../../../src/index.css";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const SignUpwithOtp = ({
  setOpenLogin,
  setShowRegisterForm,
  setShowSignUp,
  setPhoneNumber,
  phoneNumber,
}) => {
  const [closeSignup, setCloseSignUp] = useState(true);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const getVerifyOtp = (e) => {
    console.log("ver");
    let config = {
      headers: {
        Authorization: `Bearer ${jwt }`,
      },
    };

    let verifyData = new FormData();
    verifyData.append("accesskey", "90336");
    verifyData.append("type", "verify-user");
    verifyData.append("mobile", phoneNumber);
    setisLoading(true);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-registration.php",
        verifyData,
        config
      )
      .then((res) => {
        // console.log(res, "res this is aleredy resgeistere");
        console.log(res);
        if (res.data.error) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(res.data.message);
          setisLoading(false);
        } else {
          console.log("phone number", phoneNumber);

          if (phoneNumber.length >= 12) {
            console.log("phone number", phoneNumber);
            setExpandForm(true);
            genrateReCaptcha();
            setisLoading(false);

            let appVerifier = window.recaptchaVerifier;
            const formatPh = "+" + phoneNumber;

            signInWithPhoneNumber(auth, formatPh, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                // ...

                toast.success("OTP Sent Successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
              .catch((error) => {});
          }
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("An error occurred. Please try again later.");
      });
  };

  const genrateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  const requstOtp = (e) => {
    e.preventDefault();
    getVerifyOtp();

    // console.log("phone number", phoneNumber);
    // e.preventDefault();
    // if (phoneNumber.length >= 12) {
    //   console.log("phone number", phoneNumber);
    //   setExpandForm(true);
    //   genrateReCaptcha();

    //   let appVerifier = window.recaptchaVerifier;
    //   const formatPh = "+" + phoneNumber;

    //   signInWithPhoneNumber(auth, formatPh, appVerifier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //       // ...

    //       toast.success("OTP sended successfully! !", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //     })
    //     .catch((error) => {});
    // }
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (OTP.length === 6) {
      console.log("inside length 6");
      // debugger
      window.confirmationResult
        .confirm(OTP)
        .then((res) => {
          toast.success("Verification Successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(res, "otp confirmattiomn response");
          setShowRegisterForm(true);
          setShowSignUp(false);
          // setLoginForm()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCloseSignUp = () => {
    setCloseSignUp((prev) => !prev);
    setOpenLogin(false);
  };
  const isPhoneNumberValid = (phone) => {
    return phone.replace(/\D/g, "").length === 10;
  };
  return (
    <div>
      {closeSignup && (
        <>
          <ToastContainer />
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
            <div></div>
            <div className="relative w-[518px] h-[430px] my-6 mx-auto max-w-3xl bg-white rounded-lg">
              <div id="recaptcha-container"></div>
              <div className="px-5 py-2 flex justify-between text-center items-center rounded-sm-y">
                <h3 className="text-2xl  text-center text-GrayBlinkit">
                  Register{" "}
                </h3>

                <span
                  className="text-2xl text-graycol cursor-pointer"
                  onClick={handleCloseSignUp}
                >
                  x
                </span>
              </div>
              <div className="border-b border-b-light_gray mt-3"></div>
              {/* <div class="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light_gray after:mt-0.5 after:flex-1 after:border-t after:border-light_gray">
                <p class="mx-4 mb-0 text-center font-semibold">OR</p>
              </div> */}

              <div className="relative p-6 flex-auto ">
                <form className="bg-white md:rounded px-8 pt-4  justify-center items-center text-center">
                  <div id="recaptcha-container"></div>

                  <p
                    htmlFor=""
                    className="justify-center items-center text-center mb-8 text-[20px] text-GrayBlinkit whitespace-pre-line"
                  >
                    Enter your phone number to {"\n"} Login/Sign up
                  </p>

                  <div className="mb-3 flex justify-center items-center gap-2 w-[74%] ml-16  border border-border_gray ">
                    <label htmlFor="" className="text-[16px]">
                      <FaMobileAlt className="text-GrayBlinkit " />
                    </label>
                    <input
                      className="w-[74%]  p-3 rounded-lg outline-none"
                      type="text"
                      disabled={expandForm}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone"
                    />
                  </div>

                  {expandForm === true ? (
                    <div className="mb-3">
                      {" "}
                      <p
                        htmlFor=""
                        className="justify-center items-center text-center mb-4 text-[20px]  text-GrayBlinkit "
                      >
                        Enter verification code
                      </p>
                      <div className="">
                        <OtpInput
                          value={OTP}
                          onChange={setOTP}
                          separator={<span className="mx-2">-</span>}
                          isInputNum={true}
                          inputStyle="border border-GrayBlinkit rounded-md text-center  text-xl  mx-auto"
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                    </div>
                  ) : null}

                  {expandForm === false ? (
                    <button
                      className="rounded-full bg-lava_grey text-white xs:rounded-lg xs:text-xs w-[74%] ml-8 h-10 md:text-base md:font-medium inline-block font-medium ..."
                      onClick={requstOtp}
                      disabled={isPhoneNumberValid(phoneNumber)}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="rounded-full bg-lime xs:rounded-lg xs:text-xs  xs:h-8 md:w-full xs:w-full md:h-10 md:text-base md:font-medium inline-block hover:bg-orange font-medium ..."
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>
                  )}
                </form>

                {/* <div>
                  <p className="text-GrayBlinkit text-[12px] text-center items-center mt-3">
                    By continuing, you agree to our
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {showSignUpForm && <Signup />}
    </div>
  );
};
