import React, { useState } from "react";
import { FaFacebookSquare, FaGoogle, FaLinkedin } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import DropdownMenu from "../AccountDropdown/DropdownMenu";
import { Signup } from "./Signup";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = ({
  isOpen,
  setIsOpen,
  onClick,
  dispatchLogin,
  setLoggedIn,
}) => {
  const [logins, setLogins] = useState({
    phone: "",
    password: "",
  });
  const [showModals, setShowModals] = useState(false);
  const [loginData, setLoginData] = useState([]);

  const handleShow = (e) => {
    e.preventDefault();
    setShowModals(true);
  };
  const navigate = useNavigate();

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogins({ ...logins, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          navigate("/");
          dispatchLogin({ type: "LOGIN", payload: res.data.name });
          onClick(e);
        } else {
          toast.error("Invalid phone OR password! !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => 
      console.log(err)
      );

    setLogins({
      phone: "",
      password: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 xs:mt-0.5 bg-white">
        <DropdownMenu
          dispatchLogin={dispatchLogin}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <section className="h-screen">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 xs:mt-12  grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="http://grocery.intelliatech.in/dist/img/logo.png"
                className="xs:w-[300px] md:w-[600px] sm:w-[600px]"
                alt="login image"
              />
            </div>

            <div className="mb-12 mr-10 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg font-medium text-lightgray">
                  Sign in with
                </p>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca]"
                >
                  <FaFacebookSquare className="text-lg ml-2" />
                </button>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca]"
                >
                  <FaLinkedin className="text-lg ml-2" />
                </button>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full shadow-[0_4px_9px_-4px_#3b71ca]"
                >
                  <FaGoogle className="text-lg ml-2" />
                </button>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-light_gray after:mt-0.5 after:flex-1 after:border-t after:border-light_gray">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label
                    for="phone"
                    // className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Phone
                  </label>
                  <input
                    type="phone"
                    className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="phone"
                    onChange={inputHandler}
                    name="phone"
                    value={logins.phone}
                    placeholder="Phone"
                  />
                  
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                <label
                    for="password"
                    // className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="password"
                    placeholder="Password"
                    onChange={inputHandler}
                    value={logins.password}
                    name="password"
                  />
                  {/* <label
                    for="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label> */}
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-block rounded bg-lime px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Login
                  </button>
                  <NavLink to={"/reset"}>
                    <a className="cursor-pointer xs:ml-8">Forgot password?</a>
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
      </section>

      {showModals ? <Signup /> : " "}
    </>
  );
};
