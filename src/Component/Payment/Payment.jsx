import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useCartStore } from "../zustand/useCartStore";
import { Aside } from "../Aside/Aside";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";

function Payment({ isOpen, setIsOpen }) { 
  const { clearCartApi, setAllCartItems } = useCartStore();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [chosenPayment, setChosenPayment] = useState("");
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
    userInfo,
    addList,
    deliveryAddress,
  } = useUserStore();
  const { allCartItems, cartTotal } = useCartStore();

  let { address, area_name, city_name, country } = addList.find((item) => {
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


  const handleConfirmOrder = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    let cashOnData = new FormData();
    cashOnData.append("accesskey", "90336");
    cashOnData.append("place_order", "1");
    // cashOnData.append("user_id", `${user_id}`);
    cashOnData.append("user_id", "46");
    // cashOnData.append("mobile", `${userInfo.mobile}`);
    cashOnData.append("mobile", "+917042719917");
    cashOnData.append("product_variant_id", JSON.stringify(varArr));
    cashOnData.append("quantity", JSON.stringify(qtyArr));
    cashOnData.append("delivery_charge", "0");
    // cashOnData.append("total", `${cartTotal}`);
    cashOnData.append("total", "790");
    // cashOnData.append("final_total", `${cartTotal}`);
    cashOnData.append("final_total", "790");
    // cashOnData.append(
    //   "address",
    //   `${address + " " + area_name + " " + city_name + " " + country}`
    // );
    cashOnData.append(
      "address",
      "Indore"
    );
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

    return axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/order-process.php",
        cashOnData,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
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

  const handleSuccessPay = () => {
    clearCartApi();
    setAllCartItems([]);
  };

  return (
    <>
      <div className="md:flex md:flex-row">
        {/* <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12  md:mt-10">
          <Aside />
        </div> */}
        <div className=" xs:w-full">
          <div>
            <div className="h-[700px] flex items-center justify-center">
              <div className="max-w-md w-full p-6  rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-3">Payment Details</h2>
                <div className="mb-3">
                  Select Payment Method
                  {paymentOptionsArray.map((item) => {
                    return (
                      paymentMethods[`${item.id}`] == 1 && (
                        <div key={item.id} className="flex items-center">
                          {console.log(paymentMethods[`${item.id}`])}
                          <input
                            className="mr-2 leading-tight"
                            type="radio"
                            name={item.labelFor}
                            id={item.id}
                            onClick={() => {
                              handlePaymentMethod(item.code);
                            }}
                          />
                          <label htmlFor={item.labelFor}>{item.label}</label>
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
                      className="bg-lime text-white hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                    >
                      Proceed to Pay
                    </button>
                  </div>
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
