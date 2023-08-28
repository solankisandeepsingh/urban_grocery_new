import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { SignUpwithOtp } from "./SignUpwithOtp";
import { useApiStore } from "../zustand/useApiStore";
import { useRef } from "react";
import { useEffect } from "react";

export const Login = ({
  // setUser_id,
  // setLoggedIn,
  setNewUserLog,
  setOpenLogin,
}) => {
  const [logins, setLogins] = useState({
    phone: "",
    password: "",
  });
  const { allCartItems, config, clearCartApi, setAllCartItems } =
    useCartStore();
  const { setUserInfo } = useUserStore();
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const countryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();
  const [visiblePassword, setVisiblePassword] = useState(false);
  let loginRef = useRef(null);

  const handleShow = (e) => {
    e.preventDefault();
    setLoginForm(false);
    setShowSignUp(true);
    // setOpenLogin(false)
    // setLoginFormModals(false);
  };
  const closeLoginModal = () => {
    // setLoginFormModals(false);
    if (setNewUserLog) {
      setNewUserLog(false);
    }

    if (setOpenLogin) {
      setOpenLogin(false);
    }
    navigate("/");
  };
  console.log(allCartItems, "INSIDE LOGIN AFERT LOGIN");

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the modal box
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      loginForm(false);
      showRegisterForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const getUserCarts = (user_id) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   };

  //   var bodyFormdata = new FormData();
  //   bodyFormdata.append("accesskey", '90336');
  //   bodyFormdata.append("get_user_cart", "1");
  //   bodyFormdata.append("user_id", user_id);
  //   setisLoading(true);

  //   return axios
  //     .post(
  //       "https://grocery.intelliatech.in/api-firebase/cart.php",
  //       bodyFormdata,
  //       config
  //     )
  //     .then((res) => {
  //       console.log(res, "[GET USER CART API RESPONSE]");

  //       let addQtyAmount = res?.data?.data?.map((data) => ({
  //         ...data,
  //         amount: +data.qty,
  //       }));
  //       console.log(addQtyAmount, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //       // setAddItem(addQtyAmount);

  //       {
  //         addQtyAmount && setAllCartItems(addQtyAmount);
  //       }
  //       setisLoading(false);
  //       total();
  //       totalAmount();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setisLoading(false);
  //     });
  // };

  const handleShowVisivblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogins({ ...logins, [name]: value });
  };

  const clearCart = () => {
    clearCartApi();
  };

  const handleSubmit = (e) => {
    console.log("HANDLE LOGIN");
    e.preventDefault();

    // setLoggedIn(true);

    // if (!logins.phone || !logins.password) {
    //   toast.error("Please enter both phone and password!", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // } else {
    //   const loginItem = new FormData();
    //   loginItem.append("accesskey", "90336");
    //   loginItem.append("mobile", logins.phone);
    //   loginItem.append("password", logins.password);
    //   loginItem.append("fcm_id", "YOUR_FCM_ID");
    //   setisLoading(true);

    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //   };

    //   axios
    //     .post(
    //       "https://grocery.intelliatech.in/api-firebase/login.php",
    //       loginItem,
    //       config
    //     )
    //     .then((res) => {
    //       console.log(res);

    //       setisLoading(false);
    //       if (res.data.user_id) {
    //         setLoginData([...loginData, logins]);
    //         console.log("LOGIN THRU CART<><><><>");
    //         closeLoginModal();
    //         navigate("/");
    //         localStorage.setItem("token", `${jwt}`);
    //         // dispatchLogin({ type: "LOGIN", payload: res.data.name });
    //         console.log("LOGIN RESPONSEEEEEEEEEEEEEE", res.data);
    //         setUserInfo(res.data);
    //         let newUserId = res?.data?.user_id;
    //         // setUser_id(newUserId);
    //         // clearCart(newUserId);
    //         toast.success("Login successfully !", {
    //           position: toast.POSITION.TOP_CENTER,
    //         });

    //         const addMultipleItems = () => {
    //           let arr = {};
    //           allCartItems.forEach((item) => {
    //             arr[item.product_variant_id] = item.amount;
    //           });

    //           let variants = Object.keys(arr).join(",");
    //           let variantQty = Object.values(arr).join(",");
    //           console.log("variants", variants);
    //           console.log("variantQty", variantQty);

    //           console.log(config);
    //           var bodyFormdata = new FormData();
    //           bodyFormdata.append("accesskey", "90336");
    //           bodyFormdata.append("add_multiple_items", "1");
    //           bodyFormdata.append("user_id", newUserId);
    //           bodyFormdata.append("product_variant_id", variants);
    //           bodyFormdata.append("qty", variantQty);
    //           setisLoading(true);

    //           return axios
    //             .post(
    //               "https://grocery.intelliatech.in/api-firebase/cart.php",
    //               bodyFormdata,
    //               config
    //             )
    //             .then((res) => {
    //               console.log(res, "res<><><><><><><><>");
    //               // getUserCarts(newUserId);
    //               setisLoading(false);
    //             })
    //             .catch((error) => {
    //               console.log(error);
    //               setisLoading(false);
    //             });
    //         };

    //         addMultipleItems();
    //         console.log("getuser");
    //         // getUserCarts(newUserId);
    //       } else {
    //         toast.error("Invalid phone OR password! !", {
    //           position: toast.POSITION.TOP_CENTER,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err, "LOGIN ERROR ><><><><><><><><><");
    //       setisLoading(false);
    //     });
    // }

    if (!logins.phone && !logins.password) {
      toast.error("Please enter both phone and password!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } else if (!logins.phone) {
      toast.error("Please enter a valid phone number!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } else if (!logins.password) {
      toast.error("Please enter a password!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } else {
      setisLoading(true);

      const loginItem = new FormData();
      loginItem.append("accesskey", "90336");
      loginItem.append("mobile", logins.phone);
      loginItem.append("password", logins.password);
      loginItem.append("fcm_id", "YOUR_FCM_ID");

      let config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      axios
        .post(
          "https://grocery.intelliatech.in/api-firebase/login.php",
          loginItem,
          config
        )
        .then((res) => {
          console.log(res);

          setisLoading(false);

          if (!res.data.error) {
            // ... rest of your success logic ...
            setLoginData([...loginData, logins]);
            console.log("LOGIN THRU CART<><><><>");
            closeLoginModal();
            navigate("/");
            localStorage.setItem("token", `${jwt}`);
            // dispatchLogin({ type: "LOGIN", payload: res.data.name });
            console.log("LOGIN RESPONSEEEEEEEEEEEEEE", res.data);
            setUserInfo(res.data);
            let newUserId = res?.data?.user_id;
            // setUser_id(newUserId);
            // clearCart(newUserId);

            toast.success("Logged in successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });

            const addMultipleItems = () => {
              let arr = {};
              allCartItems.forEach((item) => {
                arr[item.product_variant_id] = item.amount;
              });

              let variants = Object.keys(arr).join(",");
              let variantQty = Object.values(arr).join(",");
              console.log("variants", variants);
              console.log("variantQty", variantQty);

              console.log(config);
              var bodyFormdata = new FormData();
              bodyFormdata.append("accesskey", "90336");
              bodyFormdata.append("add_multiple_items", "1");
              bodyFormdata.append("user_id", newUserId);
              bodyFormdata.append("product_variant_id", variants);
              bodyFormdata.append("qty", variantQty);
              setisLoading(true);

              return axios
                .post(
                  "https://grocery.intelliatech.in/api-firebase/cart.php",
                  bodyFormdata,
                  config
                )
                .then((res) => {
                  console.log(res, "res<><><><><><><><>");
                  // getUserCarts(newUserId);
                  setisLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                  setisLoading(false);
                });
            };

            addMultipleItems();
            console.log("getuser");
            // getUserCarts(newUserId);
          } else if (!logins.phone) {
            toast.error("Please Enter A Correct Phone Number", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 800,
            });
          } else
            toast.error("Please Enter A Correct Password", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 800,
            });
        })
        .catch((err) => {
          console.log(err, "LOGIN ERROR ><><><><><><><><><");
          setisLoading(false);
        });
    }

    setLogins({
      phone: "",
      password: "",
    });
  };

  // const isWeakPassword = logins.password.length < 6;
  // const isStrongPassword = logins.password.length > 7;

  // const passwordStrengthMessage =
  //   logins.password.length >= 6 ? "Strong Password" : "Weak Password";

  // const strongPasswordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // const weakPasswordRegex = /^(.{1,7}|[^a-zA-Z0-9])$/;

  const handleForgotPassword = () => {};
  return (
    <>
      {loginForm && (
        <>
          <ToastContainer />
          <div className="fixed  z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
            <div
              className="bg-[#f5f5f5] rounded top-[5%] left-[5%] md:w-[500px] xs:w-[340px] sm:w-[500px]"
              ref={loginRef}
            >
              <div className="flex justify-center items-center relative">
                <div className="container relative flex ">
                  <div className="mb-4 mt-32 w-[40%]">
                    <img
                      src="http://grocery.intelliatech.in/dist/img/logo.png"
                      className="w-40 mx-4 "
                      alt="Flowbite Logo"
                    />
                  </div>

                  <div className="w-full p-8 md:px-12 mr-auto rounded-2xl ">
                    <button
                      className="absolute top-[5%] right-[5%]"
                      onClick={closeLoginModal}
                    >
                      <AiOutlineCloseCircle className="text-red text-2xl hover:opacity-50" />
                    </button>
                    <div className="flex justify-between">
                      <h1 className="font-bold uppercase text-3xl">Login :</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div></div>
                      <div className="gap-5 mt-5">
                        <input
                          className="w-full border-red-800  text-gray-900 mt-2 p-3 rounded-lg  focus:shadow-outline "
                          type="text"
                          onChange={inputHandler}
                          name="phone"
                          value={logins.phone}
                          placeholder="Phone"
                        />

                        <div className="relative flex items-center">
                          <input
                            className="w-full bg-gray-100 border-gray-400 text-gray-900 mt-2 p-3 rounded-lg focus:shadow-outline"
                            type={visiblePassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={inputHandler}
                            value={logins.password}
                            name="password"
                          />
                          <div
                            onClick={handleShowVisivblePassword}
                            className="absolute xs:ml-[250px] md:ml-[246px] sm:ml-[280px] mt-2 cursor-pointer"
                          >
                            {visiblePassword ? (
                              <AiFillEye />
                            ) : (
                              <AiFillEyeInvisible />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-8 mt-6 flex items-center justify-between">
                        <button
                          type="submit"
                          className="inline-block  bg-lime px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Login
                        </button>
                        {/* <div className="" onClick={handleForgotPassword}>
                          <p className="cursor-pointer xs:ml-8">
                            Forgot password?
                          </p>
                        </div> */}
                      </div>

                      <div className="text-center lg:text-left">
                        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                          Don't have an account?
                          <a
                            href=""
                            className="text-danger transition ml-2 text-[green] duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                            onClick={handleShow}
                          >
                            Sign up now
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showRegisterForm && (
        <Signup
          setOpenLogin={setOpenLogin}
          setLoginForm={setLoginForm}
          setShowRegisterForm={setShowRegisterForm}
          phoneNumber={phoneNumber}
        />
      )}

      {/* {showSignUp && <SignUpOtp setOpenLogin={setOpenLogin}/>} */}
      {showSignUp && (
        <SignUpwithOtp
          setShowRegisterForm={setShowRegisterForm}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          setShowSignUp={setShowSignUp}
          setOpenLogin={setOpenLogin}
        />
      )}
      {/* <SignUpwithOtp setOpenLogin={setOpenLogin}/> */}
    </>
  );
};
