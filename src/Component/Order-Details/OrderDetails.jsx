import React from "react";
import { AiFillEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const OrderDetails = ({ setDetailsOrder, orderData, orderId }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/myorder");
    setDetailsOrder(false);
  };
  console.log(orderId, "orderId");
  return (
    <>
      <div className="w-[66%]">
        {orderId &&
          orderData.map((item) => {
            console.log(item.id, "itemmmmmmmmmmmmmmm");
            if (item.id === orderId)
              return (
                <div className=" w-[100%]">
                  <div className="mt-[80px] flex">
                    <span>
                      <FaArrowLeft
                        className="bg-white text-lime cursor-pointer"
                        onClick={handleBack}
                      />
                    </span>
                    <p className="back-button bg-white ml-2 mb-2 font-bold">
                      Order Details
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col ">
                      <p className="text-lime font-bold">
                        Order OTP :{item.otp}
                      </p>
                      <p className="font-semi-bold">Order ID : {item.id}</p>
                      <p className="font-semi-bold mb-3">
                        Order Date : {item.order_time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      {item.items &&
                        item.items.map((data) => {
                          return (
                            <>
                              <div className="flex flex-row border border-light_gray justify-between text-center  p-3 mb-4">
                                <div>
                                  <img
                                    src={data.image}
                                    alt=""
                                    className="w-28 h-24 rounded-2xl"
                                  />
                                </div>
                                <div className=" mb-2 flex flex-col items-end">
                                  <p>{data.product_name}</p>
                                  <p className="text-lightgray">
                                    {" "}
                                    Qty : {data.quantity}
                                  </p>
                                  <p className="text-lime font-bold">
                                    ₹{data.price}
                                  </p>
                                  <p className="text-light_gray font-bold">
                                    {data.active_status}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>

                    <hr />

                    <div className="flex flex-col list-none mt-2 mb-4 ">
                      <h2 className="font-bold">Price-Details</h2>
                      <li className="cursor-pointer">
                        <div className="flex justify-between mt-2 ">
                          <p className=" sm:text-lg md:text-sm ">Items</p>

                          <p className=" sm:text-lg md:text-sm">₹500</p>
                        </div>
                      </li>
                      <li className="  cursor-pointer ">
                        <div className="flex justify-between mt-4  ">
                          <p className=" sm:text-lg md:text-sm">
                            Delivery Charge
                          </p>

                          <p className=" sm:text-lg md:text-sm">
                            +₹{item.delivery_charge}
                          </p>
                        </div>
                      </li>
                      <li className="  cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <p className=" sm:text-lg md:text-sm">Discount(0%)</p>

                          <p className=" sm:text-lg md:text-sm">
                            ₹{item.discount}
                          </p>
                        </div>
                      </li>
                      <li className=" cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <p className=" sm:text-lg md:text-sm">Promo Code</p>

                          <p className=" sm:text-lg md:text-sm">
                            ₹{item.promo_code}
                          </p>
                        </div>
                      </li>
                      <li className=" cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <p className=" sm:text-lg md:text-sm">Wallet</p>
                          <p className=" sm:text-lg md:text-sm">
                            ₹{item.wallet_balance}
                          </p>
                        </div>
                      </li>
                      <li className=" cursor-pointer">
                        <div className="flex justify-between mt-4  ">
                          <p className=" sm:text-lg md:text-sm font-bold">
                            Final Total
                          </p>
                          <p className=" sm:text-lg md:text-sm font-bold">
                            ₹{item.final_total}
                          </p>
                        </div>
                      </li>
                    </div>

                    <hr className="mt-2" />
                    <div className="mt-2">
                      <h2 className="font-bold">Other-Details</h2>
                      <li className=" cursor-pointer list-none">
                        <div className="flex justify-between mt-4  list-none">
                          <p className="sm:text-lg md:text-sm">Name</p>

                          <p className=" sm:text-lg md:text-sm">
                            {item.user_name}
                          </p>
                        </div>
                      </li>
                      <li className=" bg-white cursor-pointer list-none">
                        <div className="flex justify-between mt-4 ">
                          <p className="bg-white sm:text-lg md:text-sm ">
                            Mobile
                          </p>

                          <p className="bg-white sm:text-lg md:text-sm ">
                            {item.mobile}
                          </p>
                        </div>
                      </li>
                      <li className=" bg-white cursor-pointer list-none">
                        <div className="flex justify-between mt-4  ">
                          <p className="bg-white sm:text-lg md:text-sm">
                            Address
                          </p>

                          <p className="bg-white sm:text-lg md:text-sm list-none">
                            {item.address}
                          </p>
                        </div>
                      </li>
                    </div>
                  </div>
                  <hr className="mt-2" />

                  <div className="mt-2">
                    <h2 className="font-bold">Order-Staus</h2>
                    <p className="text-center">Order</p>
                    <p className="text-center font-bold">Status: {item.status_name}</p>
                    {/* <div className="flex justify-center items-center text-lime text-[30px]">
                      <AiFillEye className="text-center" />
                    </div> */}

                    <p className="text-center">{item.status_time}</p>
                  </div>
                  
                  {/* <div className="flex justify-around mb-2">
                    <div>
                      <button className="bg-lime rounded-lg p-2 text-white ">Re-Order</button>
                    </div>
                    <div>
                      <button className="bg-lime rounded-lg p-2 text-white">Get Invoice</button>
                    </div>
                  </div> */}
                </div>
              );
            else return null;
          })}
      </div>
    </>
  );
};
