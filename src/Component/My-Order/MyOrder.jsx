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
import { useApiStore } from "../zustand/useApiStore";


export const MyOrder = ({ addItem }) => {
  const [price, setPrice] = useState(0);
  const [detailsOrder, setDetailsOrder] = useState(false);
  const {
    userInfo: { user_id },
  } = useUserStore();

  // const [orderData, setOrderData] = useState("");
  const {allOrderDetails,setAllOrderDetails} = useOrderDetails();
  const [orderId, setOrderId] = useState("");
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

  // const total = () => {
  //   let price = 0;
  //   addItem.map((e) => {
  //     price += parseFloat(e.price) * e.amount;
  //   });
  //   setPrice(price);
  // };

  // useEffect(() => {
  //   total();
  // }, [total]);

  const handleOrderDetails = (item) => {
    setOrderId(item);
    setDetailsOrder((prev) => !prev);
    // setDetailsOrder(true)
  };

  return (
    <>
      {/* <div className="flex flex-row justify-evenly"> */}
      <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        {!detailsOrder ? (
          <div className="md:w-[60%] xs:w-full ">
            <div className=" border border-light_gray p-4">
              {allOrderDetails &&
                allOrderDetails.map((item) => {
                  return (
                    <div className="bg border-b flex justify-between items-center  border-[#e8e8e8] py-3">
                      <div className="w-[95%]">
                        <div className="flex ml-3 justify-between text-center">
                          <div>
                            <p className="font-bold">Order_Id : {item.id}</p>
                          </div>
                          <div>
                            <p className="text-lime font-bold">
                              Total : ₹{item.total}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between text-center mt-3">
                          <div>
                            <p className=" ml-3 text-gryColour break-all">
                              {item.items.length} Items
                            </p>
                          </div>
                          <div>
                            <p className="text-gryColour">
                              Place-Order : {item.delivery_time}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between mt-3">
                          <div className=" text-gryColour break-all text-sm">
                            {item.items &&
                              item.items.map((data) => (
                                <p className="ml-3   ">{data.product_name}</p>
                              ))}
                          </div>
                        </div>

                        <div className="flex justify-end ">
                          <div className="flex  justify-center items-center border mb-4  m-2 border-light_gray p-1 rounded-lg w-28 text-[12px]">
                            <p>{item.active_status.toLocaleUpperCase()}</p>
                          </div>
                          <div className="flex shadow-lg gap-2 mt-2 w-36 text-[12px] mb-4 border border-light_gray p-1 rounded-lg">
                            <div className="text-[18px]">
                              <GiScooter />
                            </div>
                            <div>
                              <p>Door Step Delivery</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className=" cursor-pointer"
                        onClick={() => handleOrderDetails(item.id)}
                      >
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
                })}
            </div>
          </div>
        ) : (
          <OrderDetails
          // setAllOrderDetails={setAllOrderDetails}
            orderId={orderId}
            // orderData={orderData}
          />
        )}
      </div>
    </>
  );
};
