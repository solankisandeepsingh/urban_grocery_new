import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { OrderDetails } from "../Order-Details/OrderDetails";
import { GiScooter } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";
import { useLoaderState } from "../zustand/useLoaderState";
import { useUserStore } from "../zustand/useUserStore";
import { useOrderDetails } from "../zustand/useOrderDetails";
import { useNavigate } from "react-router-dom";
import { useApiStore } from "../zustand/useApiStore";

export const MyOrder = ({ addItem }) => {
  const [price, setPrice] = useState(0);
  // const [detailsOrder, setDetailsOrder] = useState(false);
  const {
    userInfo: { user_id },
  } = useUserStore();
  const navigate = useNavigate();
  const { orderId, setOrderId } = useOrderDetails();
  console.log(orderId, "order");

  // const [orderData, setOrderData] = useState("");
  const { allOrderDetails, setAllOrderDetails } = useOrderDetails();
  // const [orderId, setOrderId] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  const handlemyOrder = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    let myOrderData = new FormData();
    myOrderData.append("accesskey", "90336");
    myOrderData.append("get_orders", "1");
    myOrderData.append("user_id", user_id);
    setisLoading(true);
    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/order-process.php`,
        myOrderData,
        config
      )
      .then((res) => {
        // console.log(res.data.data, "myorder data will displayyyyyyyyyyy");
        setAllOrderDetails(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    handlemyOrder();
  }, []);

  const handleOrderDetails = (item) => {
    setOrderId(item);
    console.log(item, "item");
    navigate("/orderdetailspage");
  };

  return (
    <>
      {/* <div className="flex flex-row justify-evenly"> */}
      {/* <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div> */}

      <div className="flex flex-col mt-24  xs:justify-center xs:items-center  md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%] xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] overflow-y-scroll h-[90vh]">
          {/* <div className="md:w-[60%] xs:w-full "> */}
          <div className=" border border-light_gray p-4 rounded-md">
            {allOrderDetails?.length > 0 ? (
              allOrderDetails.map((item) => {
                return (
                  <div
                    onClick={() => handleOrderDetails(item.id)}
                    className="bg border-b flex justify-between items-center cursor-pointer rounded hover:bg-[#f5f5f5]  border-[#e8e8e8] py-3"
                  >
                    <div className="w-[95%]">
                      <div className="flex ml-3 justify-between text-center">
                        <div>
                          <p className="font-bold text-gryColour">
                            Order Id : {item.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-lime font-bold">
                            Total : ₹{item.total}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between text-center mt-3">
                        <div>
                          <p className=" ml-3  break-all">
                            {item.items.length} Items
                          </p>
                        </div>
                        <div>
                          {item.delivery_time ? (
                            <p className="text-gryColour">
                              Place-Order : {item.delivery_time}
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mt-3">
                        <div className="  break-all text-sm">
                          {item.items &&
                            item.items.map((data) => (
                              <p className="ml-3   ">{data.product_name}</p>
                            ))}
                        </div>
                      </div>

                      <div className="flex justify-end ">
                        {/* <div className="flex bg-skybluelight  shadow-sm justify-center items-center  border mb-4  m-2 border-light_gray p-1 rounded-lg w-32 text-[12px]">
                          <p className="text-text-black">
                            {item.active_status.toLocaleUpperCase()}
                          </p>
                        </div> */}

                        <div
                          className={`flex shadow-sm justify-center items-center  mb-4 m-2 p-1 rounded-lg w-32 text-[12px] ${
                            item.active_status === "received"
                              ? "bg-lime text-white"
                              : item.active_status === "delivered"
                              ? "bg-graycolor text-white"
                              : item.active_status === "return"
                              ? "bg-GreenColour text-white"
                              : item.active_status === "awaiting"
                              ? "bg-yellowAwaiting text-black"
                              : item.active_status === "processed"
                              ? "bg-TWITTER_BLUE text-white"
                              : item.active_status === "shipped"
                              ? "bg-gmail_color text-black"
                              : item.active_status === "cancel"
                              ? "bg-RedColour text-white"
                              : item.active_status === "ready_to_pickup"
                              ? "bg-green text-white"
                              : "bg-skybluelight text-text-black"
                          }`}
                        >
                          <p>{item.active_status.toLocaleUpperCase()}</p>
                        </div>
                        <div className="flex shadow-sm gap-2 mt-2 w-36 text-[12px] mb-4 border border-light_gray p-1 rounded-lg">
                          <div className="text-[18px]">
                            <GiScooter />
                          </div>
                          <div>
                            <p>Door Step Delivery</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" cursor-pointer">
                      <BsChevronRight />
                    </div>
                    {/* <div className="flex shadow-lg gap-2 mt-2 justify-end ">
                        <div className="flex">
                        <div className=" text-[12px] mb-4 border border-light_gray p-1 rounded-lg">
                        <GiScooter className="text-[20px] mt-1" />
                        <p>Door Step Delivery</p>
                        </div>
                        </div>
                      </div> */}

                    {/* <hr className="mb-2 text-gryColour" /> */}
                  </div>
                );
              })
            ) : (
              <>
                <p className="text-lg font-bold ">No Orders Yet</p>
              </>
            )}
          </div>
        </div>
        {/* ) : (
          <OrderDetails
          // setAllOrderDetails={setAllOrderDetails}
            orderId={orderId}
            // orderData={orderData}
          />
        )} */}
      </div>
    </>
  );
};
