import React from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "../../Component/AccountDropdown/DropdownMenu";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useCartStore } from "../zustand/useCartStore";

function Payment({ isOpen,setIsOpen}) {
const {clearCartApi} = useCartStore();

console.log(clearCartApi);


  const handleCashOnDelivery = () => {
    console.log("Cash on Delivery");
 
    let config = {
      headers:{
        Authorization :`Bearer ${API_TOKEN}`
      }
    } 
    let CashOnData = new FormData();
    CashOnData.append("accesskey","90336")
    CashOnData.append("place_order","1")
    CashOnData.append("user_id","33")
    CashOnData.append("mobile","7042719917")
    CashOnData.append("product_variant_id",["847"])
    CashOnData.append("delivery_charge","50")
    CashOnData.append("total","500")
    CashOnData.append("final_total","500")
    CashOnData.append("address","indore")
    CashOnData.append("latitude","44.456321")
    CashOnData.append("longitude","12.456987")
    CashOnData.append("payment_method","COD")
    CashOnData.append("quantity",["3"])
    CashOnData.append("discount","0")
    CashOnData.append("tax_percentage","0")
    CashOnData.append("tax_amount","0")
    CashOnData.append("area_id","1")
    CashOnData.append("order_note","home")
    CashOnData.append("order_from","test ")
    CashOnData.append("local_pickup","1 ")
    CashOnData.append("wallet_used","false")
    CashOnData.append("status","awaiting_payment ")
    CashOnData.append("delivery_time","Today - Evening (4:00pm to 7:00pm)")

    axios.post("https://grocery.intelliatech.in/api-firebase/order-process.php",
    CashOnData,config
    ).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err)
      console.log(err.message)
    })
  };

  const handleRazorpay = () => {
    // Handle Razorpay payment method
    console.log("Razorpay");
  };

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

  const handleSuccessPay =()=>{
    clearCartApi();
  }

  return (
    <>
    <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 xs:mt-0.5 bg-white">
        <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      <div>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Payment Method
              </label>
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  name="paymentMethod"
                  id="cashOnDelivery"
                  onClick={handleCashOnDelivery}
                />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  name="paymentMethod"
                  id="razorpay"
                  onClick={handleRazorpay}
                />
                <label htmlFor="razorpay">Razorpay</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  name="paymentMethod"
                  id="creditCard"
                />
                <label htmlFor="creditCard">Credit Card</label>
              </div>
            </div>
            <form onSubmit={handleCreditCardSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cardName"
                >
                  Card Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardName"
                  type="text"
                  placeholder="Enter your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  type="text"
                  placeholder="Enter your card number"
                  required
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="expiryDate"
                  >
                    Expiry Date
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                  />
                </div>
              </div>
              <div className="mr-6 flex flex-wrap">
                <div className="my-1">
                  <label htmlFor="month" className="sr-only">
                    Select expiration month
                  </label>
                  <select
                    name="month"
                    id="month"
                    className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Month</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
              <div>
                <NavLink to={`/success`}>
                  <button className="bg-lime w-full rounded-xl p-1" onClick={handleSuccessPay}>Pay</button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
