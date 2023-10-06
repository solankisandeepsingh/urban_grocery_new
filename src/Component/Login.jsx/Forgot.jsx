import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useApiToken } from "../zustand/useApiToken";
import { toast } from "react-toastify";
import axios from "axios";
import { FaArrowLeft, FaMobileAlt } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { auth } from "../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect } from "react";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";

export const Forgot = ({
  phoneNumber,
  setPhoneNumber,
  setForgotForm,
  setLoginForm,
  forgotForm,
}) => {
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const {
    userInfo: { user_id },
  } = useUserStore();
  const [newChangePass, setNewChangePass] = useState(true);
  const [otpVarify, setOtpVarify] = useState(false);
  const { apiToken } = useApiToken();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [id, setId] = useState("");
  const { setisLoading } = useLoaderState();
  const [resendBtn, setResendBtn] = useState(false);
  const [timer, setTimer] = useState(60);
  const [saveForgotRecaptca, setSaveForgotRecaptcha] = useState("null");

  const startResendTime = () => {
    setResendBtn(true);
    let minutes = 1;
    let seconds = 59;

    const formatTime = (minutes, seconds) => {
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    setTimer(formatTime(minutes, seconds));

    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setResendBtn(false);
        } else {
          minutes -= 1;
          seconds = 59;
        }
      } else {
        seconds -= 1;
      }
      setTimer(formatTime(minutes, seconds));
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    validateConfirmPassword(newPassword);
  };

  const validatePassword = (newPassword) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(newPassword)) {
      setPasswordError(
        "Password must be 8 characters including one uppercase letter, one lowercase letter, one special character, ."
      );
      setIsMatch(false);
    } else {
      setPasswordError("");
      setIsMatch(newPassword === confirmPassword);
    }
  };

  const validateConfirmPassword = (newPassword) => {
    const match = newPassword === password;
    setIsMatch(match);

    if (!match) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("Passwords match");
    }
  };

  const verfiyUser = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };
    const verifydata = new FormData();
    verifydata.append("accesskey", "90336");
    verifydata.append("type", "verify-user");
    verifydata.append("mobile", "+91" + phoneNumber);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-registration.php",
        verifydata,
        config
      )
      .then((res) => {
        setId(res?.data?.id);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVerifyOtp = (e) => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let formData = new FormData();
    formData.append("accesskey", "90336");
    formData.append("type", "forgot-password-mobile");
    formData.append("mobile", "+91" + phoneNumber);
    setisLoading(true);
    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/user-registration.php`,
        formData,
        config
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
          });
          setisLoading(false);
        } else {
          if (phoneNumber.length >= 10) {
            setExpandForm(true);
            // genrateReCaptcha();
            if (!window.recaptchaVerifier) {
              genrateReCaptcha();
            }
            setisLoading(false);

            let appVerifier = window.recaptchaVerifier;
            const formatPh = "+91" + phoneNumber;

            signInWithPhoneNumber(auth, formatPh, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                // ...

                toast.success("OTP has been sent successfully", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 500,
                });
                setId(res.data.id);
                verfiyUser();
              })
              .catch((error) => {});
          }
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("An Error Occurred. Please Try Again Later.");
      });
  };

  const genrateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response, "Recaptcha response");
          setSaveForgotRecaptcha(response);
        },
      }
    );
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    getVerifyOtp();
    startResendTime();
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (OTP?.length === 6) {
      window.confirmationResult
        .confirm(OTP)
        .then((res) => {
          toast.success("OTP successfully verified", {
            position: toast.POSITION.TOP_CENTER,
          });
          setExpandForm(false);
          setNewChangePass(false);
          setOtpVarify(true);
        })
        .catch((err) => {
          console.log(err);
          toast.success("Incorrect Otp please check the otp", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  const handleResendOtp = () => {
    getVerifyOtp();
    setResendBtn(true);
    startResendTime();
  };

  useEffect(() => {
    if (timer === 0) {
      setResendBtn(false);
    }
  }, [timer]);

  const isPhoneNumberValid = (phone) => {
    return phone.replace(/\D/g, "").length === 10;
  };
  const handleCloseForm = () => {
    setForgotForm(false);
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    const changePasswordData = new FormData();
    changePasswordData.append("accesskey", "90336");
    changePasswordData.append("type", "change-password");
    changePasswordData.append("id", id);
    changePasswordData.append("password", password);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-registration.php",
        changePasswordData,
        config
      )
      .then((res) => {
        console.log(res.data, "new user id here is");
        setPassword(res.message);
        setForgotForm(false);
        setLoginForm(true);
        toast.success("Profile updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // const handleForgotShow = () => {
  //   setForgotForm(false);
  //   setLoginForm(true);
  // };

  const handleForgotShow = () => {
    if (expandForm) {
      setExpandForm(false);
      setForgotForm(true);
      setLoginForm(false);
    } else if (forgotForm) {
      setExpandForm(false);
      setForgotForm(false);
      setLoginForm(true);
    }
  };
  return (
    <>
      <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
        <div></div>
        <div className="relative w-[500px] h-[353px] my-6 mx-auto max-w-3xl bg-white rounded-lg">
          <div id="recaptcha-container"></div>
          <div className="px-5 py-2 flex justify-between text-center items-center rounded-sm-y">
            <span>
              {" "}
              <FaArrowLeft
                className="bg-white cursor-pointer"
                onClick={handleForgotShow}
              />
            </span>
            <h3 className="text-2xl  text-center text-GrayBlinkit">
              Forgot Password
            </h3>

            <span
              className="text-2xl text-graycol cursor-pointer"
              onClick={handleCloseForm}
            >
              x
            </span>
          </div>
          <div className="border-b border-b-light_gray mt-3"></div>

          <div className="relative p-6 flex-auto ">
            {newChangePass && (
              <form className="bg-white md:rounded px-8 pt-4  justify-center items-center text-center">
                <div id="recaptcha-container"></div>

                <div className="mb-3 flex justify-center items-center gap-2 w-[74%] ml-16  border border-border_gray ">
                  <label htmlFor="" className="text-[16px]">
                    <FaMobileAlt className="text-GrayBlinkit " />
                  </label>
                  <input
                    className="w-[74%]  p-3 rounded-lg outline-none"
                    type="text"
                    disabled={expandForm}
                    value={`+91${phoneNumber}`}
                    onChange={(e) => {
                      const forgotPhone = e.target.value.slice(
                        3,
                        e.target.value.length
                      );
                      if (forgotPhone?.length <= 10) {
                        setPhoneNumber(forgotPhone);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    name="phone"
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
                        inputStyle="border border-GrayBlinkit rounded-md text-left px-1 text-2xl  mx-auto"
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                  </div>
                ) : null}

                {expandForm === false ? (
                  <button
                    className={`${
                      isPhoneNumberValid(phoneNumber)
                        ? "bg-lime hover:bg-customGreen text-white cursor-pointer"
                        : "bg-lava_grey text-white"
                    } rounded-full xs:rounded-lg xs:text-xs w-[74%] ml-8 h-10 md:text-base md:font-medium inline-block font-medium`}
                    onClick={handleForgotSubmit}
                    // disabled={!isPhoneNumberValid(phoneNumber)}
                    disabled={!isPhoneNumberValid(phoneNumber) || resendBtn}
                  >
                    Next
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <button
                      className="rounded-full bg-lime hover:bg-customGreen text-white xs:rounded-lg xs:text-xs  xs:h-8 md:w-full xs:w-full md:h-10 md:text-base md:font-medium inline-block font-medium ..."
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>
                    {resendBtn ? (
                      <p className="text-xs font-bold text-red ">{timer}</p>
                    ) : (
                      <button
                        className="rounded-full bg-Light_BLUE text-white hover:bg-Crayola_blue xs:rounded-lg xs:text-xs xs:h-8 md:w-full xs:w-full md:h-10 md:text-base md:font-medium inline-block font-medium ..."
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                )}
              </form>
            )}

            {otpVarify && (
              <>
                <div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type={visibleNewPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        passwordError && "border-lime"
                      }`}
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div
                      onClick={() => setVisibleNewPassword((prev) => !prev)}
                      className="absolute right-2 top-2 cursor-pointer mt-8"
                    >
                      {visibleNewPassword ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </div>
                  </div>

                  {passwordError && (
                    <p className="text-red text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={visibleConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        confirmPasswordError ? "border-red-500" : ""
                      }`}
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <div
                      onClick={() => setVisibleConfirmPassword((prev) => !prev)}
                      className="absolute right-2 top-2 cursor-pointer mt-8"
                    >
                      {visibleConfirmPassword ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </div>
                  </div>

                  {confirmPasswordError && (
                    <p
                      className={`text-sm mt-1 ${
                        isMatch ? "text-lime" : "text-red"
                      }`}
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-lime hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={!isMatch}
                    onClick={handleClickSubmit}
                  >
                    Reset Password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
