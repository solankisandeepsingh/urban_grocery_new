import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import { auth } from "../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebookF, FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";

export const SignUpOtp = ({ setOpenLogin }) => {
  const [closeSignup, setCloseSignUp] = useState(true);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup(e) {
    e.preventDefault();
    console.log("why not clokci");
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setOpenLogin(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const handleCloseSignUp = () => {
    // setCloseSignUp(false);
    setCloseSignUp((prev) => !prev);
    setOpenLogin(false);
    // setLoginFormModals(false);
    // navigate("/");
  };
  return (
    <>
      {closeSignup && (
        <>
          <ToastContainer />
          <div className="fixed z-50 top-0  left-0 w-full h-full flex justify-center items-center border rounded-lg bg-black bg-opacity-75">
            <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white rounded-lg">
              <div className="px-5 py-2 flex justify-between text-center items-center rounded-sm-y">
                <div id="recaptcha-container"></div>
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
              <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light_gray after:mt-0.5 after:flex-1 after:border-t after:border-light_gray">
                <p className="mx-4 mb-0 text-center font-semibold">OR</p>
              </div>

              <div className="relative p-6 flex-auto">
                <form className="bg-white md:rounded px-8 pt-2 pb-4">
                  <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                    {user ? (
                      <h2 className="text-center text-white font-medium text-2xl">
                        👍Login Success
                      </h2>
                    ) : (
                      <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                       
                        {showOTP ? (
                          <>
                            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                              <BsFillShieldLockFill size={30} />
                            </div>
                            <label
                              htmlFor="otp"
                              className="font-bold text-xl text-white text-center"
                            >
                              Enter your OTP
                            </label>
                            <OtpInput
                              value={otp}
                              onChange={setOtp}
                              OTPLength={6}
                              otpType="number"
                              disabled={false}
                              autoFocus
                              className="opt-container "
                            ></OtpInput>
                            <button
                              onClick={onOTPVerify}
                              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                              {loading && (
                                <ImSpinner2
                                  size={20}
                                  className="mt-1 animate-spin"
                                />
                              )}
                              <span>Verify OTP</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                              <BsTelephoneFill size={30} />
                            </div>
                            <label
                              htmlFor=""
                              className="font-bold text-xl text-white text-center"
                            >
                              Verify your phone number
                            </label>
                            <PhoneInput
                              country={"in"}
                              value={ph}
                              onChange={setPh}
                            />
                            <button
                              onClick={onSignup}
                              className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                              {loading && (
                                <ImSpinner2
                                  size={20}
                                  className="mt-1 animate-spin"
                                />
                              )}
                              <span>Send code via SMS</span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
