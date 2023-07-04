import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { OrderDetails } from "../Order-Details/OrderDetails";
import { GiScooter } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";
import { useLoaderState } from "../zustand/useLoaderState";

export const MyOrder = ({ addItem, user_id }) => {
  const [price, setPrice] = useState(0);
  const [detailsOrder, setDetailsOrder] = useState(false);

  const [orderData, setOrderData] = useState("");
  const [orderId, setOrderId] = useState("");
  const { setisLoading } = useLoaderState();

  const handlemyOrder = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
        setOrderData(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false)
      });
  };

  useEffect(() => {
    handlemyOrder();
  }, []);
  const total = () => {
    let price = 0;
    addItem.map((e) => {
      price += parseFloat(e.price) * e.amount;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  const handleOrderDetails = (item) => {
    setOrderId(item);
    setDetailsOrder((prev) => !prev);
    // setDetailsOrder(true)
  };

  return (
    <>
      <div className="md:flex md:flex-row justify-evenly">
        <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-[25%] md:px-12 md:mt-10">
          <Aside />
        </div>

        {!detailsOrder ? (
          <div className="md:w-[60%] ml-16 xs:w-full md:mt-28">
            <div className=" border border-light_gray p-4">
              {orderData &&
                orderData.map((item) => {
                  return (
                    <div className="bg">
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
                          <p className=" ml-3 text-gryColour">
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
                        <div className="flex text-gryColour text-sm">
                          {item.items &&
                            item.items.map((data) => (
                              <p className="ml-3 truncate ... text-center">
                                {data.product_name}
                              </p>
                            ))}
                        </div>

                        <div
                          className=" cursor-pointer"
                          onClick={() => handleOrderDetails(item.id)}
                        >
                          <BsChevronRight />
                        </div>
                      </div>

                      <div className="flex shadow-lg gap-2 mt-2 justify-end ">
                        <div className="flex">
                          <div className=" text-[12px] mb-4 border border-light_gray p-1 rounded-lg">
                          <GiScooter className="text-[20px] mt-1" />
                           <p>Door Step Delivery</p> 
                          </div>
                        </div>
                      </div>

                      <hr className="mb-2 text-gryColour" />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <OrderDetails
            setDetailsOrder={setDetailsOrder}
            orderId={orderId}
            orderData={orderData}
          />
        )}
      </div>
    </>
  );
};
