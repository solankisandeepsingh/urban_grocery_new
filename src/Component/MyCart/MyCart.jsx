import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaShoppingCart, FaTrash } from "react-icons/fa";
import Form from "./Form/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { QtyAmount } from "../Button/QtyAmount";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Login } from "../Login.jsx/Login";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { BsChevronCompactRight } from "react-icons/bs";
import Review from "./Review/Review";
import { currencyFormatter } from "../../utils/utils";
import { usePaymentStore } from "../zustand/usePaymentStore";
import { useApiStore } from "../zustand/useApiStore";
import { useMediaQuery } from "react-responsive";

function MyCart({
  // allCartItems,
  setAddItem,
  formData,
  setFormdata,
  setNavbarOpen,
  dispatchLogin,
  setLoggedIn,
  // user_id,
  setUser_id,
  loggedIn,
}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [setAmount] = useState();
  const [price, setPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [Payment, setPayment] = useState(false);
  const [reviewPage, setReviewPage] = useState(false);
  const [newUserLog, setNewUserLog] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const { allCartItems, setAllCartItems, setCartTotal } = useCartStore();
  const {
    userInfo: { user_id },
    resetState,
  } = useUserStore();
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();
  const { setTotalPrice, setTotalMRPPrice, setTotalItems } = usePaymentStore();

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 767px)" });

  let menuRef = useRef();

  const accesskey = "90336";

  const back = () => {
    if (showForm) {
      setShowForm(false);
    }
    if (Payment) {
      setPayment(false);
    }
    if (reviewPage) {
      setReviewPage(false);
    }
  };

  const unDiscountedTotel = () => {
    let total = 0;
    allCartItems.forEach((item) => {
      total += parseFloat(item.price) * item.amount;
    });
    console.log(total, "tooooooooooooooooooooooooooooooooooooooo");
    setTotalMRPPrice(total);
  };

  const total = () => {
    let price = 0;
    allCartItems &&
      allCartItems.forEach((cartItem) => {
        if (cartItem.amount) {
          price += parseFloat(cartItem.discounted_price) * cartItem.amount;
        }
      });
    setPrice(price);
    setTotalPrice(price);
    setCartTotal(price);
  };

  const totalAmount = () => {
    let totalAmount = 0;
    allCartItems &&
      allCartItems.forEach((e) => {
        if (e.amount) {
          totalAmount += parseFloat(e.amount);
        }
      });
    setTotalItem(totalAmount);
    setTotalItems(totalAmount);
  };

  useEffect(() => {
    total();
    totalAmount();
    unDiscountedTotel();
  }, [allCartItems]);

  const removeItemHandler = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", "90336");
    bodyFormdata.append("remove_from_cart", "1");
    bodyFormdata.append("user_id", user_id);
    bodyFormdata.append("product_variant_id", `${item.product_variant_id}`);
    setisLoading(true);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        let newArr = allCartItems.filter((data) => data.id !== item.id);
        console.log(newArr);
        setAllCartItems(newArr);
        let newPrice = price - item.amount * parseFloat(item.price);
        setPrice(newPrice);
        setCartTotal(newPrice);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const hideMOdal = () => {
    setShowModal(false);
    setPayment(false);
    setShowForm(false);
    setReviewPage(false);
  };

  const formHandler = () => {
    setShowForm(true);
    setReviewPage(false);
    setPayment(true);
    setNewUserLog(false);
  };

  const handleCloseModal = () => {
    resetState();
    setPayment(false);
    setReviewPage(false);
  };

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setShowModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const getUserCarts = (user_id) => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", accesskey);
    bodyFormdata.append("get_user_cart", "1");
    bodyFormdata.append("user_id", user_id);
    setisLoading(true);

    return axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        console.log(res, "[GET USER CART API RESPONSE]");

        let addQtyAmount = res?.data?.data?.map((data) => ({
          ...data,
          amount: +data.qty,
        }));
        console.log(addQtyAmount, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        // setAddItem(addQtyAmount);

        {
          addQtyAmount && setAllCartItems(addQtyAmount);
        }
        setisLoading(false);
        total();
        totalAmount();
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  useEffect(() => {
    getUserCarts(user_id);
  }, [accesskey]);
  console.log(allCartItems, " ADD ITEM IN MYCART <><><><><");

  return (
    <>
      <button
        // className="relative md:bg-lime sm:bg-lime xs:bg-skyblue  text-white items-center float-right flex gap-1
        // font-bold py-1 rounded shadow xs:my-2 xs:px-2 2xs:my-2 2xs:py-2 2xs:px-1"
        className="relative md:bg-lime sm:bg-lime xs:bg-skyblue  text-white items-center float-right flex gap-1
        font-bold md:px-2 rounded shadow  "
        type="button"
        onClick={() => {
          setShowModal(true);
          getUserCarts(user_id);
        }}
      >
        <div
          className={" xs:p-2 md:relative md:bg-lime sm:bg-lime xs:bg-white"}
        >
          <div className={`${totalItem > 0 ? "visible":"invisible"}`+ " " + "hidden md:block  absolute top-1 right-0 px-1 rounded-full bg-red text-xs"}>
            {totalItem}
          </div>
          {/* <div className="absolute top-0">O</div> */}
          <FaShoppingCart className="xs:text-2xl md:bg-lime sm:bg-lime md:text-white sm:text-white xs:text-lime " />
        </div>
        <div className="md:bg-lime sm:bg-lime xs:bg-white">
          {price > 0 && allCartItems ? (
            <>
              {/* <div className=" hidden md:block sm:block bg-lime text-sm">
                {totalItem} items
              </div> */}
              <div className="block md:hidden absolute top-1 right-1 px-1 rounded-full bg-red text-xs">
                {totalItem}
              </div>
            </>
          ) : (
            <div className="xs:hidden 2xs:hidden md:block sm:block bg-lime ">
              My Cart
            </div>
          )}
          {price > 0 && allCartItems ? (
            <div className="md:bg-lime md:text-white hidden md:block text-sm float-left">
              ₹ {price}
            </div>
          ) : null}
        </div>
      </button>

      {showModal ? (
        <>
          <div
            className="float-right absolute top-0 right-0 bg-white"
            ref={menuRef}
          >
            <div className="relative ">
              <div className="h-[97vh] min-h-screen md:w-96 sm:w-screen xs:w-screen border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                <div className="bg-white flex items-start justify-between p-3 m-0  border-b border-light_gray shadow-sm">
                  <div className="mt-3 bg-white">
                    {showForm ? (
                      <button className="back-button bg-white" onClick={back}>
                        <FaArrowLeft className="bg-white" />
                      </button>
                    ) : null}
                    {reviewPage ? (
                      <button className="back-button bg-white" onClick={back}>
                        <FaArrowLeft className="bg-white" />
                      </button>
                    ) : null}
                  </div>

                  <p className="py-2 text-2xl font-semibold bg-white">
                    My Cart
                  </p>
                  <button
                    className="bg-transparent text-black float-right"
                    onClick={hideMOdal}
                  >
                    <span className="text-black opacity-6 h-10 w-9 text-2xl block bg-gray-400 py-0 rounded-full bg-white">
                      <AiOutlineCloseCircle
                        className="text-red text-2xl hover:opacity-50 mt-3"
                        onClick={handleCloseModal}
                      />
                    </span>
                  </button>
                </div>

                <div
                  className=" bg-white overflow-y-scroll md:h-[700px] xs:h-[758px] sm:h[985px] 2xs:h-[500px]"
                  style={{
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    "-ms-overflow-style": "none",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {!showForm && allCartItems.length && !reviewPage
                    ? allCartItems &&
                      allCartItems?.map((item, index) => {
                        console.log(item, "<><><><><><><><><><><><><><><");
                        return (
                          <>
                            <div
                              class={`mt-3 bg-white ${
                                index === allCartItems.length - 1
                                  ? "mb-[80px]"
                                  : ""
                              }  2xs:p-3 border-b-[2px] border-[#e8e8e8]`}
                            >
                              <div class="flow-root">
                                <div
                                  role="list"
                                  class=" divide-y divide-gray-200 "
                                >
                                  <div class="flex p-2 bg-white items-center">
                                    <div class=" bg-white md:h-[80px] md:w-[72px]  xs:h-24 xs:w-24 sm:h-44 sm:w-44 sm:rounded-lg flex-shrink-0 overflow-hidden rounded-md ">
                                      <img
                                        src={item?.image}
                                        alt="product"
                                        class="h-full w-full object-cover object-center bg-white"
                                      />
                                    </div>

                                    <div class="bg-white ml-4 flex flex-1 flex-col truncate ...">
                                      <div class=" bg-white md:text-xs xs:text-sm sm:text-3xl ">
                                        <p className="bg-white float-left	text-lightgray truncate ...">
                                          {item.name}
                                        </p>
                                        <br />

                                        <div className="flex justify-between mt-0.5">
                                          <div className="w-[50%]">
                                            <p className="text-lightgray font-semi-bold md:text-[14px] sm:text-[24px] sm:text-darkgray">
                                              {item.serve_for}
                                            </p>

                                            <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-xs text-gryColour  font-medium inline line-through bg-white sm:text-[21px]">
                                              ₹{item.price}.00{" "}
                                            </p>
                                            <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-xs text-black  bg-white sm:text-[21px]">
                                              ₹{item.discounted_price}.00{" "}
                                            </span>

                                            <p class="bg-white text-gryColour text-[12px] md:text-[12px] font-bold sm:text-[21px]">
                                              {" "}
                                              {item?.measurement + " "}
                                              {item?.unit}
                                              {() => setAmount(item?.amount)}
                                            </p>
                                          </div>
                                          <div className="flex items-center justify-evenly xs:gap-4 md:justify-around sm:justify-between text-center w-[50%]">
                                            {/* <div className=""> */}
                                            <div className="bg-white">
                                              <QtyAmount
                                                item={item}
                                                setAddItem={setAddItem}
                                                allCartItems={allCartItems}
                                              />
                                            </div>
                                            <div className="bg-white">
                                              <FaTrash
                                                onClick={() =>
                                                  removeItemHandler(item)
                                                }
                                                className="bg-white hover:bg-RedColour hover:bg-opacity-20 cursor-pointer xs:text-[18px]  md:text-[15px] xs:text-sm sm:text-3xl text-red"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* {console.log(user_id, "><><><CHECK USER ID BOOLEAN><><><")} */}
                                {user_id === '' ? (
                                  newUserLog ? (
                                    <Login
                                      // setLoggedIn={setLoggedIn}
                                      // dispatchLogin={dispatchLogin}
                                      // setUser_id={setUser_id}
                                      user_id={user_id}
                                      setNewUserLog={setNewUserLog}
                                      // getUserCarts={getUserCarts}
                                      // loggedIn={loggedIn}
                                      // handleLogin={handleLogin}
                                      // allCartItems={allCartItems}
                                      getUserCarts={getUserCarts}
                                    />
                                  ) : (
                                    <>
                                      <button
                                        className="flex justify-between bg-lime p-3 mt-5  border-3 text-white fixed bottom-0 md:w-96 xs:w-[350px] sm:w-[750px] 2xs:w-[260px] rounded-lg"
                                        onClick={() => setNewUserLog(true)}
                                      >
                                        <p className="p-2 bg-lime text-xl font-bold rounded-lg">
                                          Total : {currencyFormatter(price)}
                                        </p>
                                        <div className="flex items-center min-w-max justify-center">
                                          <p className="p-2 bg-lime text-xl  rounded-lg">
                                            Proceed
                                          </p>
                                          <BsChevronCompactRight className="te" />
                                        </div>
                                      </button>
                                    </>
                                  )
                                ) : (
                                  <button
                                    className="flex justify-between mt-5 md:w-96 bg-lime p-3 text-white fixed bottom-0  xs:w-[350px] sm:w-[750px] 2xs:w-[260px] rounded-lg"
                                    onClick={formHandler}
                                  >
                                    <p className="p-2 bg-lime text-xl font-bold rounded-lg">
                                      Total : {currencyFormatter(price)}
                                    </p>
                                    <div className="flex items-center justify-center min-w-max">
                                      <p className="p-2 bg-lime text-xl  rounded-lg">
                                        Proceed
                                      </p>
                                      <BsChevronCompactRight className="te" />
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })
                    : null}

                  {!showForm && !allCartItems.length ? (
                    <div className="relative p-6 flex-auto text-center text-2xl font-medium bg-white">
                      <p className="bg-white">Your cart is empty</p>
                    </div>
                  ) : null}

                  {showForm ? (
                    <Form
                      back={back}
                      setFormdata={setFormdata}
                      formData={formData}
                      setShowModal={setShowModal}
                      setNavbarOpen={setNavbarOpen}
                      user_id={user_id}
                      setUser_id={setUser_id}
                      setReviewPage={setReviewPage}
                      setShowForm={setShowForm}
                    />
                  ) : null}

                  {reviewPage ? (
                    <Review
                      back={back}
                      setShowModal={setShowModal}
                      setReviewPage={setReviewPage}
                      setNavbarOpen={setNavbarOpen}
                      price={price}
                      totalItem={totalItem}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default MyCart;
