import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { BsChevronCompactRight } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { currencyFormatter } from "../../utils/utils";
import { usePaymentStore } from "../zustand/usePaymentStore";

// import {  SiRazorpay } from "../react-icons/si";

function Payment({ price }) {
  const { clearCartApi, setAllCartItems, allCartItems, cartTotal } =
    useCartStore();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [chosenPayment, setChosenPayment] = useState("");
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
    userInfo,
    addList,
    deliveryAddress,
  } = useUserStore();
  const navigate = useNavigate();

  const { totalPrice, totalMRPPrice, totalItems } = usePaymentStore();

  let { address, area_name, city_name, type, name, pincode, country } =
    addList.find((item) => {
      return item.id == deliveryAddress;
    });

  // console.log(`${address + ' '+ area_name + ' ' + city_name + ' '+ country}`)
  let varArr = allCartItems.map((item) => {
    return item.product_variant_id;
  });
  let qtyArr = allCartItems.map((item) => {
    return `${item.amount}`;
  });
  console.log(varArr, qtyArr);

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let paymentMethod = new FormData();
    paymentMethod.append("accesskey", "90336");
    paymentMethod.append("settings", "1");
    paymentMethod.append("get_payment_methods", "1");
    setisLoading(true);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        paymentMethod,
        config
      )
      .then((res) => {
        setPaymentMethods(res?.data?.payment_methods);
        setisLoading(false);
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
  };

  
  let createRazorpayId = new FormData();
  createRazorpayId.append("accesskey", "90336");
  createRazorpayId.append("amount", `${totalPrice * 100}`);

  let config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const result = await axios.post("https://grocery.intelliatech.in/api-firebase/create-razorpay-order.php",
  createRazorpayId,
  config
);

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_kYyI51d6qc5O2x", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "IntelliaTech.",
      description: "Test Transaction",
      image: "http://grocery.intelliatech.in/dist/img/logo.png",
      order_id: order_id,
      "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
      prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
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

  const handleConfirmOrder = () => {
if(chosenPayment === 'COD'){
  let config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  let cashOnData = new FormData();
  cashOnData.append("accesskey", "90336");
  cashOnData.append("place_order", "1");
  cashOnData.append("user_id", `${user_id}`);
  // cashOnData.append("user_id", "46");
  cashOnData.append("mobile", `${userInfo.mobile}`);
  // cashOnData.append("mobile", "+917042719917");
  cashOnData.append("product_variant_id", JSON.stringify(varArr));
  cashOnData.append("quantity", JSON.stringify(qtyArr));
  cashOnData.append("delivery_charge", "0");
  cashOnData.append("total", `${cartTotal}`);
  // cashOnData.append("total", "790");
  cashOnData.append("final_total", `${cartTotal}`);
  // cashOnData.append("final_total", "790");
  cashOnData.append(
    "address",
    `${address + " " + area_name + " " + city_name + " " + country}`
  );
  // cashOnData.append(
  //   "address",
  //   "Indore"
  // );
  cashOnData.append("latitude", "44.456321");
  cashOnData.append("longitude", "12.456987");
  // cashOnData.append("payment_method", `${chosenPayment}`);
  cashOnData.append("payment_method", "COD");
  // cashOnData.append("discount", "0");
  // cashOnData.append("tax_percentage", "0");
  // cashOnData.append("tax_amount", "0");
  // cashOnData.append("area_id", "1");
  // cashOnData.append("order_note", "home");
  // cashOnData.append("order_from", "test ");
  // cashOnData.append("local_pickup", "0");
  // cashOnData.append("wallet_used", "false");
  // cashOnData.append("status", "awaiting_payment ");
  // cashOnData.append("delivery_time", "Today - Evening (4:00pm to 7:00pm)");
  // setisLoading(true);

  return axios
    .post(
      "https://grocery.intelliatech.in/api-firebase/order-process.php",
      cashOnData,
      config
    )
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
    })
}
else if(chosenPayment === "razorpay"){
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
  // const methodIcons = {
  //   cod_payment_method : "as",
  //   razorpay_payment_method :
  // }
  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardNumber = formData.get("cardNumber");
    const expiryDate = formData.get("expiryDate");
    const cvv = formData.get("cvv");
    // Handle credit card payment method with the form data
    console.log("Credit Card");
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
  };

  // const handleSuccessPay = () => {};
  console.log(allCartItems, "allcartitem");

  return (
    <>
      <div className="flex justify-evenly items-center text-center">
        <div className=" flex w-[50%] items-center justify-center">
          <div className=" w-full p-6 h-[40vh]  rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-3">Payment</h2>
            <div className="mb-3">
              Select Payment Method
              {paymentOptionsArray.map((item) => {
                return (
                  paymentMethods[`${item.id}`] == 1 && (
                    <div key={item.id} className="flex items-center py-2">
                      {console.log(paymentMethods[`${item.id}`])}
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name={'payment method '}
                        id={item.id}
                        onClick={() => {
                          handlePaymentMethod(item.code);
                        }}
                      />
                      {/* <BsCashStack /> */}
                      <label htmlFor={item.id}>{item.label}</label>
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
                  className="bg-lime text-white my-4 hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="mt-28 border border-light_gray p-3 h-auto w-[350px]">
              <h2 className="text-[black] font-bold">Order Summary</h2>
              <div className="my-4">
                <p className="text-[black] text-left font-bold">
                  Delivery Address:{" "}
                </p>
                <div className="  flex  gap-1 rounded-md">
                  <div className="flex gap-2 ">
                    {/* <div className="w-[5%]">
                      {type === "Home" ? (
                        <FaHome className="inline ml-3 mb-1" />
                      ) : (
                        <HiOfficeBuilding className="inline ml-3 mb-1" />
                      )}
                    </div> */}
                    <div className="w-[85%] flex flex-col">
                      {/* <div className="font-medium text-left">
                        {type === "Home" ? "Home" : "Work"}
                      </div> */}
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

              <div className="flex flex-col list-none mt-2 mb-4">
                <h2 className="font-bold text-start">Payment Details</h2>

                {/* {allCartItems.map((item, index) => (
                  <li key={index} className="cursor-pointer">
                    <div className="flex justify-between mt-2">
                      <p className="sm:text-lg md:text-sm">Item</p>
                      <p className="sm:text-lg md:text-sm">
                        ₹{item.totalPrice}.00
                      </p>
                    </div>
                  </li>
                ))} */}
                <li className="cursor-pointer">
                  <div className="flex justify-between mt-2">
                    <p className="sm:text-lg md:text-sm">Items</p>
                    <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                      {currencyFormatter(totalMRPPrice)}
                    </p>
                  </div>
                </li>
                <li className="cursor-pointer">
                  <div className="flex justify-between mt-2">
                    <p className="sm:text-lg md:text-sm">Discount</p>
                    <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                      - {currencyFormatter(totalMRPPrice - totalPrice)}
                    </p>
                  </div>
                </li>
                {/* 
                <li className="cursor-pointer">
                  <div className="flex justify-between mt-4">
                    <p className="sm:text-lg md:text-sm">Discounted Price</p>
                    <p className="sm:text-lg md:text-sm">
                      {currencyFormatter(totalPrice)}
                    </p>
                  </div>
                </li> */}

                <li className="cursor-pointer">
                  <div className="flex justify-between mt-2">
                    <p className="sm:text-lg md:text-sm">Delivery Charge</p>
                    <p className="sm:text-lg md:text-sm text-customGreen font-bold">
                      -
                    </p>
                  </div>
                </li>

                {/* <li className="cursor-pointer">
                  <div className="flex justify-between mt-2">
                    <p className="sm:text-lg md:text-sm">Number of Items</p>
                    <p className="sm:text-lg md:text-sm text-customGreen">
                    {totalItems}
                    </p>
                  </div>
                </li> */}

                {/* FOR PROMO CODE */}

                {/* <li className="cursor-pointer">
                  <div className="flex justify-between mt-2">
                    <p className="sm:text-lg md:text-sm">Promo Code</p>
                    <p className="sm:text-lg md:text-sm">
                      {allCartItems[0].promo_code}
                    </p>
                  </div>
                </li> */}
                <div className="border-b border-light_gray my-2 "></div>

                <li className="cursor-pointer">
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

              {/* <div className="flex justify-between font-bold text-[12px] mt-[-36px]">
                <p className="text-[#8d9191] px-3">Final_Amount</p>
                <p className="mr-4 text-customGreen ">₹{totalPrice}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
