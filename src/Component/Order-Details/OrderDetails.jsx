import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const OrderDetails = ({setDetailsOrder}) => {
  const navigate = useNavigate();
  const handleBack= ()=>{
    navigate("/myorder")
    setDetailsOrder(false)
  }
  return (
    <>
    
      <div className="ml-28">
        <div className="mt-[80px] flex">
          <span>
            <FaArrowLeft className="bg-white cursor-pointer" onClick={handleBack} />
          </span>
          <p className="back-button bg-white ml-2 mb-1.5">Order Details</p>
        </div>
        <div>
          <div className="flex flex-col">
            <p>Order OTP :207124</p>
            <p>Order ID :459</p>
            <p>Order Date :30-06-2023 03:25:28 PM</p>
          </div>
        </div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <p>Basket(1Pack)</p>
            <p>Qty : 1</p>
            <p>$price</p>
            <p >Via Razorpay</p>
            <p>Recieved</p>
          </div>

          <hr />

          <div className="flex flex-col ">
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Items</p>

                <p className="bg-white sm:text-lg md:text-sm">₹500</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer ">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">
                  Delivery Charge
                </p>

                <p className="bg-white sm:text-lg md:text-sm">+₹0.00</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Discount(0%)</p>

                <p className="bg-white sm:text-lg md:text-sm">-₹0.00</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Total</p>

                <p className="bg-white sm:text-lg md:text-sm">₹140</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Wallet</p>

                <p className="bg-white sm:text-lg md:text-sm">₹140</p>
              </div>
            </li>
          </div>
          <div>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Name</p>

                <p className="bg-white sm:text-lg md:text-sm">Yash Gupta</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Mobile</p>

                <p className="bg-white sm:text-lg md:text-sm">+917042719917</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Address</p>

                <p className="bg-white sm:text-lg md:text-sm">Indore</p>
              </div>
            </li>
            <li className=" bg-white cursor-pointer">
              <div className="flex justify-between mt-4  ">
                <p className="bg-white sm:text-lg md:text-sm">Name</p>

                <p className="bg-white sm:text-lg md:text-sm">00000</p>
              </div>
            </li>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};
