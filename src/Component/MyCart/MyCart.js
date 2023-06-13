import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaShoppingCart, FaTrash } from "react-icons/fa";

import Form from "./Form/Form";
import Review from "./Review/Review";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { QtyAmount } from "../Button/QtyAmount";
import CartQuantity from "../Button/CartQuantity";
import { AddressForm } from "../MyAddress/AddressForm";

function MyCart({ addItem, setAddItem, formData, setFormdata }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [Payment, setPayment] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  // const [addList, setAddlist] = useState([]);

  const accesskey = "90336";
  const user_id = "14";

  const hideMOdal = () => {
    setShowModal(false);
    setShowForm(false);
  };

  const back = () => {
    if (showForm) {
      setShowForm(false);
    }
    if (Payment) {
      setPayment(false);
    }
  };

  const total = () => {
    let price = 0;
    addItem.forEach((cartItem) => {
      // console.log(addItem);
      if (cartItem.amount) {
        price += parseFloat(cartItem.price) * cartItem.amount;
      }
    });
    setPrice(price);
    // console.log(price,"piceeeeeeeeeeeeeeeeeeeeeeeeee")
  };

  const totalAmount = () => {
    let totalAmount = 0;
    addItem.forEach((e) => {
      if (e.amount) {
        totalAmount += parseFloat(e.amount);
      }
    });
    setTotalItem(totalAmount);
  };

  useEffect(() => {
    total();
    totalAmount();
  }, [addItem]);

  const removeItemHandler = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", "90336");
    bodyFormdata.append("remove_from_cart", "1");
    bodyFormdata.append("user_id", "14");
    bodyFormdata.append("product_variant_id", `${item.product_variant_id}`);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        setAddItem((cart) => cart.filter((data) => data.id !== item.id));
        let newPrice = price - item.amount * parseFloat(item.price);
        setPrice(newPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formHandler = () => {
    setShowForm(true);
    setPayment(true);
  };

  const handlePayment = () => {
    navigate("/payment");
    hideMOdal();
  };

  let menuRef = useRef();

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

  const getUserCarts = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", accesskey);
    bodyFormdata.append("get_user_cart", "1");
    bodyFormdata.append("user_id", user_id);

    return axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        // console.log(res.data.data, "cart my-response");
        // console.log(res.data.data.map(data=> ({...data ,amount:+data.qty})), "my-response");

        let addQtyAmount = res.data.data.map((data) => ({
          ...data,
          amount: +data.qty,
        }));
        //  console.log(addqtytoamount, "addqtytoamount");
        setAddItem(addQtyAmount);
        total();
        totalAmount();
      })
      .catch((error) => {
        console.log("hello this error is shown in the program", error);
      });
  };

  useEffect(() => {
    getUserCarts();
  }, [accesskey, user_id]);

  console.log("addItemmmmmmmmmmmmmmmmmmmmmmmm",addItem)
  return (
    <>
      <button
        className="relative bg-lime text-white float-right flex gap-1
        font-bold py-1 rounded shadow xs:my-2 xs:px-2 2xs:my-2 2xs:py-2 2xs:px-1"
        type="button"
        onClick={() => {
          setShowModal(true);
          getUserCarts(accesskey, user_id);
        }}
      >
        <div
          className={
            price > 0 ? "mt-3" : null + "relative xs:px-2 2xs:px-2 bg-lime"
          }
        >
          <FaShoppingCart className="xs:text-2xl bg-lime hover:animate-hbeat" />
        </div>
        <div className="bg-lime">
          {price > 0 ? (
            <div className="xs:block 2xs:hidden md:block sm:block bg-lime text-sm">
              {totalItem} items
            </div>
          ) : (
            <div className="xs:hidden 2xs:hidden md:block sm:block bg-lime ">
              My Cart
            </div>
          )}
          {price > 0 ? (
            <div className="bg-lime text-white text-sm float-left">
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
              <div className=" min-h-screen md:w-96 sm:w-screen xs:w-screen border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                <div className="bg-white flex items-start justify-between px-3 py-3 m-0  border-b border-light_gray shadow-sm">
                  <div className="mt-3 bg-white">
                    {showForm ? (
                      <button className="back-button bg-white" onClick={back}>
                        <FaArrowLeft className="bg-white" />
                      </button>
                    ) : null}
                  </div>

                  <p className="py-2 text-xl font-semibold bg-white">My Cart</p>
                  <button
                    className="bg-transparent text-black float-right"
                    onClick={hideMOdal}
                  >
                    <span className="text-black opacity-6 h-10 w-9 text-2xl block bg-gray-400 py-0 rounded-full bg-white">
                      x
                    </span>
                  </button>
                </div>

                <div className=" bg-white overflow-y-scroll md:h-[700px] xs:h-[758px] sm:h[985px] 2xs:h-[500px]">
                  {!showForm && addItem.length
                    ? addItem &&
                      addItem.map((item) => {
                        return (
                          <>
                            <div class="mt-3 bg-white md:p-5 xs:p-4 2xs:p-2  ">
                              <div class="flow-root">
                                <ul
                                  role="list"
                                  class="-my-6 divide-y divide-gray-200"
                                >
                                  <li class="flex py-6 bg-white">
                                    <div class=" bg-white md:h-24 md:w-24 xs:h-24 xs:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item.image}
                                        alt="product"
                                        class="h-full w-full object-cover object-center bg-white"
                                      />
                                    </div>

                                    <div class="bg-white ml-4 flex flex-1 flex-col truncate ...">
                                      <div class=" bg-white md:text-sm xs:text-sm sm:text-3xl font-semibold text-gray-900 ">
                                        <p className="bg-white float-left truncate ...">
                                          {item.name}
                                        </p>
                                        <br />
                                        {item.variants &&
                                          item.variants.map((data) => {
                                            console.log(data,"dataaaaaaaaaaaaaaaaaa")
                                            return (
                                              <>
                                                <div className="2xs:flex-col md:flex-col bg-white">
                                                  <p class=" bg-white md:text-sm xs:text-sm sm:text-2xl font-light float-left">
                                                    {data.measurement}{" "}
                                                    {data.measurement_unit_name}
                                                  </p>
                                                  <br></br>
                                                  <p class="bg-white md:text-sm xs:text-sm sm:text-2xl text-gray-500 float-left text-lime">
                                                    ₹{data.price}{" "}
                                                  </p>
                                                  <br></br>
                                                </div>
                                              </>
                                            );
                                          })}

                                        <div className="bg-white flex justify-between ">
                                          <div className="bg-white">
                                            <p class="bg-white md:text-sm xs:text-sm sm:text-2xl font-light float-left">
                                              {" "}
                                              Qty : {item.amount}
                                              {() => setAmount(item.amount)}
                                            </p>
                                          </div>

                                          <div className="bg-white">
                                            <QtyAmount
                                              item={item}
                                              setAddItem={setAddItem}
                                              addItem={addItem}
                                            />
                                          </div>
                                          <div className="bg-white">
                                            <FaTrash
                                              onClick={() =>
                                                removeItemHandler(item)
                                              }
                                              className="bg-white cursor-pointer mt-1 md:text-sm xs:text-sm sm:text-3xl text-red"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>

                                {showForm && addItem.length ? null : (
                                  <div className="fixed bottom-10 bg-white p-3">
                                    <Review formData={formData} />
                                  </div>
                                )}

                                {Payment ? (
                                  <button
                                    className="flex justify-between bg-lime text-white  fixed bottom-0 md:w-[350px] xs:w-[350px] sm:w-[750px] 2xs:w-[260px] rounded-lg"
                                    onClick={handlePayment}
                                  >
                                    <p className="p-2 bg-lime rounded-lg">
                                      Total : ₹ {price}
                                    </p>
                                    <p className="p-2 bg-lime rounded-lg">
                                      Process to Payment{" "}
                                    </p>
                                  </button>
                                ) : (
                                  <button
                                    className="flex justify-between bg-lime text-white  fixed bottom-0 md:w-[350px] xs:w-[350px] sm:w-[750px] 2xs:w-[260px] rounded-lg"
                                    onClick={formHandler}
                                  >
                                    <p className="p-2 bg-lime rounded-lg">
                                      Total : ₹ {price}
                                    </p>
                                    <p className="p-2 bg-lime rounded-lg">
                                      Proceed{" "}
                                    </p>
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })
                    : null}

                  {!showForm && !addItem.length ? (
                    <div className="relative p-6 flex-auto text-center text-2xl font-medium bg-white">
                      <p className="bg-white">Your cart is empty</p>
                    </div>
                  ) : null}

                  {showForm ? (
                    <Form
                      back={back}
                      setFormdata={setFormdata}
                      formData={formData}
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
