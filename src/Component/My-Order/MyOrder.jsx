import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QtyAmount } from "../Button/QtyAmount";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { OrderDetails } from "../Order-Details/OrderDetails";

export const MyOrder = ({
  setAmount,
  setAddItem,
  addItem,
  user_id,
  setUser_id,
}) => {
  const [price, setPrice] = useState(0);
  const [detailsOrder, setDetailsOrder] = useState(false);

  const navigate = useNavigate();

  // const removeItemHandler = (item) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   };

  //   var bodyFormdata = new FormData();
  //   bodyFormdata.append("accesskey", "90336");
  //   bodyFormdata.append("remove_from_cart", "1");
  //   bodyFormdata.append("user_id", "14");
  //   bodyFormdata.append("product_variant_id", `${item.product_variant_id}`);
  //   axios
  //     .post(
  //       "https://grocery.intelliatech.in/api-firebase/cart.php",
  //       bodyFormdata,
  //       config
  //     )
  //     .then((res) => {
  //       setAddItem((cart) => cart.filter((data) => data.id !== item.id));
  //       let newPrice = price - item.amount * parseFloat(item.price);
  //       setPrice(newPrice);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handlePayment = () => {
    navigate("/payment");
  };

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
    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/order-process.php`,
        myOrderData,
        config
      )
      .then((res) => {
        setAddItem(res.data.data);
      })
      .catch((err) => console.log(err));
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
    // setIsOpen(false)
  }, [total]);

  const handleOrderDetails = () => {
    setDetailsOrder((prev) => !prev);
    // setDetailsOrder(true)
  };

  return (
    <>
      <div className="md:flex md:flex-row">
        <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:mt-10">
          <Aside />
        </div>

        {!detailsOrder ? (
          <div className="md:w-3/4 ml-16 xs:w-full md:mt-28 ">
            <div className="bg-white border-light_gray  ">
              {addItem &&
                addItem.map((item) => {
                  return (
                    <>
                      <div className="flex flex-col">
                        {item.items &&
                          item.items.map((data) => {
                            return (
                              <>
                                <div className="flex justify-between ">
                                  <div className="flex gap-8 mt-[20px]">
                                    <div className="bg-white xs:w-20 xs:h-20 md:h-24 md:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
                                      <img
                                        src={data.image}
                                        alt=""
                                        className="md:h-full md:w-full sm:w-44 sm:h-36 xs:w-20 xs:h-20 object-cover object-center bg-white"
                                      />
                                    </div>
                                    <div className="">
                                      <div>
                                        <p className="text-gryColour">
                                          {" "}
                                          {data.product_name}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-gryColour">
                                          Qty : {data.quantity}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-10">
                                    <p className="text-center text-lime">
                                      ₹{data.price}
                                    </p>
                                  </div>
                                </div>
                              </>
                            );
                          })}

                        <div className="mt-6 ml-3">
                          <p> Address : {item.address}</p>
                        </div>

                        <div className="mt-2 ml-3">
                          <p>Place-Order : {item.delivery_time}</p>
                        </div>

                        <div className="mt-2">
                          <button
                            className="bg-lightSky text-white hover:opacity-90 sm:w-full md:w-[10%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                            onClick={handleOrderDetails}
                          >
                            Recived
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        ) : (
          <OrderDetails setDetailsOrder={setDetailsOrder} addItem={addItem} />
        )}
      </div>
    </>
  );
};
