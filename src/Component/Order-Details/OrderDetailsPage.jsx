import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useOrderDetails } from "../zustand/useOrderDetails";
import { usePaymentStore } from "../zustand/usePaymentStore";
import { currencyFormatter } from "../../utils/utils";
import { useUserStore } from "../zustand/useUserStore";

export const OrderDetailsPage = () => {
  const { orderId, setOrderId } = useOrderDetails();
  const { allOrderDetails } = useOrderDetails();
  const { addList, deliveryAddress } = useUserStore();
  const { totalPrice, totalMRPPrice, totalItems } = usePaymentStore();

  console.log(addList, "addlist ");
  console.log(allOrderDetails, "allOrderDetails");
  const navigate = useNavigate();
  const handleBackMyorder = () => {
    navigate("/myorder");
  };
  return (
    <>
      <div>
        {orderId &&
          allOrderDetails.map((item, index) => {
            console.log(item.id, "itemmmmmmmmmmmmmmm");
            if (item.id == orderId)
              return (
                <div className="flex my-28 justify-around" key={index}>
                  <div className="md:w-[40%] sm:w-[40%] xs:w-[80%]  shadow-xl p-3 bg-[#fcfff3]">
                    <div className="flex gap-8 font-bold text-center items-center ">
                      <p>
                        <FaArrowLeft
                          className="bg-white text-graycolor text-[20px] font-semibold cursor-pointer"
                          onClick={handleBackMyorder}
                        />
                      </p>
                      <p className="text-3xl text-blackColour ">
                        Order Details
                      </p>
                    </div>
                    <div>
                      <>
                        <div className="my-6">
                          <p className="text-black font-semibold">
                            Delivery Address
                          </p>
                          <p className="text-graycolor">{item.address}</p>
                        </div>
                        <div className="flex flex-col text-left justify-around text-black ">
                          <p className="text-black font-bold">OrderDetails</p>
                          <div className="flex justify-between py-2 border-b border-b-light_gray">
                            <p className="text-graycolor text-[16px]">Name</p>
                            {/* <p>{item.user_name}</p> */}

                            {addList.map((address) => {
                              if (item.address.includes(address.address)) {
                                return <p>{address.name}</p>;
                              }
                            })}
                          </div>
                          <div className="flex justify-between py-2 border-b border-b-light_gray">
                            <p className="text-graycolor text-[16px]">Mobile</p>
                            <p>{item.mobile}</p>
                          </div>
                          <div className="flex justify-between py-2 border-b border-b-light_gray">
                            <p className="text-graycolor text-[16px]">
                              Order-Date
                            </p>
                            <p>{item.order_time}</p>
                          </div>
                          <div className="flex justify-between py-2 border-b border-b-light_gray">
                            <p className="text-graycolor text-[16px]">Total</p>
                            {/* <p>₹{item.total}</p> */}
                            <p className="text-GreenColour">
                              {currencyFormatter(item.total)}
                            </p>
                          </div>

                          <div className="flex justify-between py-2 border-b border-b-light_gray">
                            <p className="text-graycolor text-[16px] ">
                              Delivery_Charge
                            </p>
                            {/* <p>{item.delivery_charge}</p> */}
                            <p className="text-GreenColour">
                              {currencyFormatter(item.delivery_charge)}
                            </p>
                          </div>
                          <div className="flex justify-between py-2 border-b border-b-lightGrays">
                            <p className="text-graycolor text-[16px]">
                              Payment Mode
                            </p>
                            <p>{item.payment_method}</p>
                          </div>
                          <div className="flex justify-between py-3 ">
                            <p className="text-GreenColour sm:text-lg md:text-[26px] font-bold">
                              Product Total
                            </p>
                            {/* <p>₹{item.final_total}</p> */}
                            <p className="text-GreenColour font-bold md:text-[26px]">
                              {currencyFormatter(item.final_total)}
                            </p>
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                  <div className="w-[40%] xs:hidden md:block sm:block overflow-y-hidden">
                    <div className="overflow-y-scroll scrollbar-none max-h-[90vh]">
                      <p className="text-blackColour font-bold my-2">
                        Order Items ({item.items.length})
                      </p>
                      {item.items &&
                        item.items.map((data) => {
                          return (
                            <div
                              key={data.id}
                              className="flex justify-between items-center text-center p-3 mb-4 border-b border-b-light_gray"
                            >
                              <div className="truncate ...">
                                <img
                                  src={data.image}
                                  alt=""
                                  className="w-[100px] h-[80px] rounded-2xl "
                                />
                              </div>
                              <div className="mb-2 flex flex-col text-left justify-around ">
                                <p className="text-blackColour">
                                  {data.product_name}
                                </p>
                                <p className="font-bold text-customGreen">
                                  {currencyFormatter(data.discounted_price)}
                                </p>
                              </div>
                              <div className="flex justify-center items-center text-center">
                                <p className="text-lightgray">
                                  Qty: {data.quantity}
                                </p>
                              </div>
                              <div className="flex flex-col text-[16px]">
                                <p className="text-lightgray">
                                  {data.variant_name}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            else return null;
          })}
      </div>
    </>
  );
};
