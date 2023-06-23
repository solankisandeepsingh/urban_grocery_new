import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Login = ({ dispatchLogin, setUser_id, handleLogin, addItem,setLoggedIn }) => {
  const [logins, setLogins] = useState({
    phone: "",
    password: "",
  });
  const [showModals, setShowModals] = useState(false);
  const [LoginFormModals, setLoginFormModals] = useState(true);
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();

  const handleShow = (e) => {
    e.preventDefault();
    setShowModals(true);
  };
  const closeLoginModal = () => {
    setLoginFormModals(false);
    navigate("/");
  };
  console.log(addItem, "INSIDE LOGIN AFERT LOGIN")

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogins({ ...logins, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoggedIn(true);

    if (!logins.phone || !logins.password) {
      toast.error("Please enter both phone and password!");
      return;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    const loginItem = new FormData();
    loginItem.append("accesskey", "90336");
    loginItem.append("mobile", logins.phone);
    loginItem.append("password", logins.password);
    loginItem.append("fcm_id", "YOUR_FCM_ID");

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/login.php",
        loginItem,
        config
      )
      .then((res) => {
        console.log(res);

        if (!res.data.error) {
          setLoginData([...loginData, logins]);
          console.log("LOGIN THRU CART<><><><>");
          closeLoginModal();
          navigate("/");
          // handleLogin(e);
          localStorage.setItem("token", `${API_TOKEN}`);
          dispatchLogin({ type: "LOGIN", payload: res.data.name });
          let newUserId = res.data.user_id;
          setUser_id(newUserId);

        //   const addMultipleItems = () => {
        //     let arr = {};
        //     // console.log(addItem)
        //     addItem.forEach((item) => {
        //       arr[item.product_variant_id] = item.amount;
        //     });

        //     let variants = (Object.keys(arr)).join(',');
        //     let variantQty = (Object.values(arr)).join(',');
        //     console.log("variants",variants);
        //     console.log("variantQty",variantQty);

        //     console.log(config);
        //     var bodyFormdata = new FormData();
        //     bodyFormdata.append("accesskey", "90336");
        //     bodyFormdata.append("add_multiple_items", "1");
        //     bodyFormdata.append("user_id", newUserId);
        //     bodyFormdata.append("product_variant_id", variants);
        //     bodyFormdata.append("qty", variantQty);

        //     return axios
        //       .post(
        //         "https://grocery.intelliatech.in/api-firebase/cart.php",
        //         bodyFormdata,
        //         config
        //       )
        //       .then((res) => {
   
        //         console.log(res, "res<><><><><><><><>");
        //       })
        //       .catch((error) => {
        //         console.log(error);
        //       });
        //   };

        // addMultipleItems();
        } else {
          toast.error("Invalid phone OR password! !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => console.log(err));

    setLogins({
      phone: "",
      password: "",
    });
  };
  

  return (
    <>
      {LoginFormModals && (
        <>
          <ToastContainer />
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
            <div className="bg-white rounded top-[5%] left-[5%]">
              <div className="flex justify-center items-center relative">
                <div className="container relative  opacity-70">
                  <button
                    className="absolute top-[5%] right-[5%]"
                    onClick={closeLoginModal}
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
                      <h1 className="font-bold uppercase text-3xl">Login :</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div></div>
                      <div className="gap-5 mt-5">
                        <input
                          className="w-full border-red-800 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg  focus:shadow-outline "
                          type="text"
                          onChange={inputHandler}
                          name="phone"
                          value={logins.phone}
                          placeholder="Phone"
                        />
                        <input
                          className="w-full bg-gray-100 border-gray-400 text-gray-900 mt-2 p-3 rounded-lg  focus:shadow-outline"
                          type="Password"
                          placeholder="Password"
                          onChange={inputHandler}
                          value={logins.password}
                          name="password"
                        />
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
                        <NavLink to={"/reset"}>
                          <a className="cursor-pointer xs:ml-8">
                            Forgot password?
                          </a>
                        </NavLink>
                      </div>

                      <div className="text-center lg:text-left">
                        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                          Don't have an account?
                          <a
                            href=""
                            className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                            onClick={handleShow}
                          >
                            Register
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
      {showModals && <Signup />}
    </>
  );
};
