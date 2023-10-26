import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { currencyFormatter } from "../../utils/utils";
import { usePaymentStore } from "../zustand/usePaymentStore";
import  { HmacSHA256 } from "crypto-js";
import { useApiToken } from "../zustand/useApiToken";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";


function Payment({ setNavbarOpen, NavbarOpen }) {
  const { clearCartApi, setAllCartItems, allCartItems, cartTotal } =
    useCartStore();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [chosenPayment, setChosenPayment] = useState("");
  const { setisLoading } = useLoaderState();
  const { apiToken } = useApiToken();
  const {
    userInfo: { user_id },
    userInfo,
    addList,
    deliveryAddress,
  } = useUserStore();
  const navigate = useNavigate();

  const { totalPrice, totalMRPPrice } = usePaymentStore();

  let { address, area_name, city_name, type, name, pincode, country } =
    addList.find((item) => {
      return item.id == deliveryAddress;
    });

  let varArr = allCartItems.map((item) => {
    return item.product_variant_id;
  });
  let qtyArr = allCartItems.map((item) => {
    return `${item.amount}`;
  });

  useEffect(() => {
    if (apiToken) setNavbarOpen(false);
  }, [apiToken, NavbarOpen]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let paymentMethod = new FormData();
    paymentMethod.append("accesskey", "90336");
    paymentMethod.append("settings", "1");
    paymentMethod.append("get_payment_methods", "1");
    setisLoading(true);
    axiosInstance
      .post("/settings.php", paymentMethod, config)
      .then((res) => {
        setPaymentMethods(res?.data?.payment_methods);
        setisLoading(false);
        setNavbarOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        console.log(err.message);
      });
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let createRazorpayId = new FormData();
    createRazorpayId.append("accesskey", "90336");
    createRazorpayId.append("amount", `${totalPrice * 100}`);
    setisLoading(true);

    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    const result = await axiosInstance.post(
      "/create-razorpay-order.php",
      createRazorpayId,
      config
    );

    if (!result) {
      toast.error("Server error. Are you online? ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
      });
      return;
    }
    setisLoading(false);

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_kYyI51d6qc5O2x",
      amount: amount.toString(),
      currency: currency,
      name: "IntelliaTech.",
      description: "Test Transaction",
      image: "http://grocery.intelliatech.in/dist/img/logo.png",
      order_id: order_id,
      handler: function (response) {
        console.log(order_id, response.razorpay_payment_id);

        let generated_signature = HmacSHA256(
          order_id + "|" + response.razorpay_payment_id,
          "7ELzexJmKgjV6Oq67Vpot3hI"
        );
        console.log(generated_signature, response.razorpay_signature);

        if (generated_signature == response.razorpay_signature) {
          placeOrder()
            .then((res) => {
              console.log(res);
              navigate("/success");
              clearCartApi();
              setAllCartItems([]);
              setisLoading(false);
            })
            .catch((err) => {
              console.log(err.message);
              setisLoading(false);
            });
        }
      },
      prefill: {
        name: "",
        email: "text@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  let placeOrder = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let orderData = new FormData();
    orderData.append("accesskey", "90336");
    orderData.append("place_order", "1");
    orderData.append("user_id", `${user_id}`);
    orderData.append("mobile", `${userInfo.mobile}`);
    orderData.append("product_variant_id", JSON.stringify(varArr));
    orderData.append("quantity", JSON.stringify(qtyArr));
    orderData.append("delivery_charge", "0");
    orderData.append("total", `${cartTotal}`);
    orderData.append("final_total", `${cartTotal}`);
    orderData.append(
      "address",
      `${address + " " + area_name + " " + city_name + " " + country}`
    );
    orderData.append("latitude", "44.456321");
    orderData.append("longitude", "12.456987");
    orderData.append("payment_method", `${chosenPayment}`);

    setisLoading(true);

    return axiosInstance.post("/order-process.php", orderData, config);
  };

  const handleConfirmOrder = () => {
    if (chosenPayment === "COD") {
      placeOrder()
        .then((res) => {
          console.log(res);
          navigate("/success");
          clearCartApi();
          setAllCartItems([]);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          setisLoading(false);
        });
    } else if (chosenPayment === "razorpay") {
      displayRazorpay();
    }
  };

  const handlePaymentMethod = (id) => {
    setChosenPayment(id);
  };

  const paymentOptionsArray = [
    {
      id: "cod_payment_method",
      label: "Cash on delivery",
      labelFor: "Cash on delivery",
      code: "COD",
    },
    {
      id: "razorpay_payment_method",
      label: "RazorPay",
      labelFor: "RazorPay",
      code: "razorpay",
    },
    {
      id: "paypal_payment_method",
      label: "paypal",
      labelFor: "paypal",
    },
    {
      id: "payumoney_payment_method",
      label: "payumoney",
      labelFor: "payumoney",
    },
    {
      id: "paystack_payment_method",
      label: "paystack",
      labelFor: "paystack",
    },
    {
      id: "flutterwave_payment_method",
      label: "flutterwave",
      labelFor: "flutterwave",
    },
    {
      id: "midtrans_payment_method",
      label: "midtrans",
      labelFor: "midtrans",
    },
    {
      id: "stripe_payment_method",
      label: "stripe",
      labelFor: "stripe",
    },
    {
      id: "paytm_payment_method",
      label: "paytm",
      labelFor: "paytm",
    },
  ];

  return (
    <>
      <div className="xs:flex h-auto xs:flex-col xs:my-[60px] md:flex md:flex-row md:justify-between rounded-md border-light_gray md:items-center border md:text-center xs:mx-3 sm:m-20 bg-[#fafafa] px-5">
        <div className="xs:w-full sm:w-full self-start h-auto min-h-[75vh] sm:min-h-[40vh] md:w-[35%] ">
          <div className="mt-5  rounded-lg shadow-2xl min-h-[70vh] h-auto">
            <div className="bg-[#6ba9c5] py-2 rounded-t-lg">
              <h2 className="text-lg py-2 text-white font-bold text-center ">
                Select Payment Method
              </h2>
            </div>
            <div className="mb-3 px-6 flex flex-col justify-between mt-3">
              {paymentOptionsArray.map((item) => {
                return (
                  paymentMethods[`${item.id}`] == 1 && (
                    <div
                      key={item.id}
                      className="flex w-full border-b bg-[#f2f2f2] cursor-pointer border-light_gray items-center mt-2 px-4 py-3"
                      onClick={() => {
                        handlePaymentMethod(item.code);
                      }}
                    >
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name={"payment method "}
                        id={item.id}
                        checked={chosenPayment == item.code}
                      />
                      <label className="ml-2 font-bold" htmlFor={item.id}>
                        {item.label}
                      </label>
                    </div>
                  )
                );
              })}
              <div>
                <button
                  onClick={() => {
                    handleConfirmOrder();
                  }}
                  disabled={!chosenPayment}
                  className={`${
                    chosenPayment ? "bg-lime hover:opacity-90 " : "bg-[#D3D3D3]"
                  } text-white my-4 sm:w-full md:w-[90%] xs:w-[100%] sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg`}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="xs:my-16 md:mt-[20px] border border-light_gray h-auto min-h-[70vh] w-[350px] rounded-lg bg-white  md:block md:w-full xs:w-full ">
              <div className="w-full py-3 bg-[#64bd59] rounded-t-lg text-white ">
                <h2 className=" font-bold sm:text-center xs:text-center">
                  Order Summary
                </h2>
              </div>

              <div>
                <div className="overflow-y-auto max-h-[160px]">
                  {allCartItems &&
                    allCartItems?.map((items) => {
                      return (
                        <div className="flex gap-4 mt-4 ml-4  ">
                          <img
                            src={items.image}
                            alt=""
                            className="w-16 h-16 rounded-lg"
                          />
                          <div className="flex flex-col items-start justify-center text-start  ">
                            <p>{items.name}</p>
                            <div className="flex gap-2">
                              <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-xs  bg-white sm:text-[21px] text-lime font-bold">
                                ₹{items.discounted_price}.00{" "}
                              </span>
                              <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-xs text-gryColour  font-medium inline line-through bg-white sm:text-[21px]">
                                ₹{items.price}.00{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="border-b border-b-light_gray mt-4"></div>

              <div className="md:flex md:flex-row xs:flex xs:flex-col">
                <div className="my-4 p-3">
                  <p className="text-[black] text-left font-bold">
                    Delivery Address:{" "}
                  </p>
                  <div className="  flex  gap-1 rounded-md">
                    <div className="flex gap-2 ">
                      <div className="w-[80%] flex flex-col">
                        <div className=" text-left font-light text-[#8d9191] ">
                          <p className="gap-2 ">{name}, </p>
                          <span className="">{address}, </span>
                          <span className="">{area_name}, </span>
                          <span className="">{city_name}, </span>
                          <span className="">{pincode}, </span>
                          <span className="">{country} </span>
                        </div>
                      </div>
                      <div className="w-[10%] flex gap-4 items-center"></div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-light_gray my-2 "></div>

                <div className="flex flex-col p-3 list-none mt-2 mb-4 shadow-sm md:w-[40%] xs:w-full">
                  <h2 className="font-bold text-start">Payment Details</h2>

                  <li className="">
                    <div className="flex justify-between mt-2">
                      <p className="sm:text-lg md:text-sm">Items</p>
                      <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                        {currencyFormatter(totalMRPPrice)}
                      </p>
                    </div>
                  </li>
                  <li className="">
                    <div className="flex justify-between mt-2">
                      <p className="sm:text-lg md:text-sm">Discount</p>
                      <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                        - {currencyFormatter(totalMRPPrice - totalPrice)}
                      </p>
                    </div>
                  </li>

                  <li className="">
                    <div className="flex justify-between mt-2">
                      <p className="sm:text-lg md:text-sm">Delivery Charge</p>
                      <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                        -
                      </p>
                    </div>
                  </li>

                  <div className="border-b border-light_gray my-2 "></div>

                  <li className="">
                    <div className="flex justify-between mt-4">
                      <p className="sm:text-lg md:text-xl font-bold">
                        Order Total
                      </p>
                      <p className="sm:text-lg md:text-xl text-customGreen font-bold">
                        ₹{totalPrice}
                      </p>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
