import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QtyAmount } from "../Button/QtyAmount";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";

export const MyOrder = ({
  setAmount,
  setAddItem,
  addItem,
}) => {
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();


  const removeItemHandler = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", "90336");
    bodyFormdata.append("remove_from_cart", "1");
    bodyFormdata.append("user_id", "14");
    bodyFormdata.append("product_variant_id", `${item.product_variant_id}`);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        setAddItem((cart) => cart.filter((data) => data.id !== item.id));
        let newPrice = price - item.amount * parseFloat(item.price);
        setPrice(newPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    navigate("/payment");
  };

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
  return (
    <>
     
      <div className="md:flex md:flex-row">
        <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:mt-10">
          <Aside />
        </div>

        <div className="md:w-3/4 ml-16 xs:w-full md:mt-[-30px] xs:mt-[-270px] ">
          <div className="md:mt-28 md:text-center ">
            <div className="bg-white overflow-y-scroll border border-light_gray  ">
              {addItem.length
                ? addItem &&
                  addItem.map((item) => {
                    return (
                      <>
                        <div className="mt-3 xs:justify-around bg-white md:p-5 2xs:p-2  ">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              <li className="flex py-6 bg-white">
                                <div className="bg-white xs:w-20 xs:h-20 md:h-24 md:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
                                  <img
                                    src={item.image}
                                    alt="product"
                                    className="md:h-full md:w-full sm:w-44 sm:h-36 sm:ml-4 xs:w-20 xs:h-20 object-cover object-center bg-white"
                                  />
                                </div>

                                <div className="bg-white xs:ml-10 md:ml-24 md:flex md:flex-1 md:flex-col  truncate ...">
                                  <div className=" bg-white xs:text-xs md:text-sm sm:text-3xl font-semibold ">
                                    <p className="bg-white float-left xs:truncate ... md:truncate ...">
                                      {item.name}
                                    </p>
                                    <br />

                                    <>
                                      <div className="2xs:flex-col md:flex-col bg-white">
                                        <br></br>
                                        <p className="bg-white md:text-sm xs:text-xs sm:text-2xl  float-left text-graycol">
                                          ₹{item.discounted_price}{" "}
                                        </p>
                                        <br></br>
                                      </div>
                                    </>

                                    <div className="bg-white mt-2 flex justify-between ">
                                      <div className="bg-white">
                                        <p className="bg-white xs:mt-1.5 md:text-sm xs:text-xs sm:text-2xl font-light float-left">
                                          {" "}
                                          Qty : {item.amount}
                                          {() => setAmount(item.amount)}
                                        </p>
                                      </div>

                                      <div className="bg-white mt-[-40px] xs:ml-10 xs:mt-0">
                                        <QtyAmount
                                          item={item}
                                          setAddItem={setAddItem}
                                          addItem={addItem}
                                        />
                                      </div>
                                      <div className="bg-white xs:mt-1">
                                        <FaTrash
                                          onClick={() =>
                                            removeItemHandler(item)
                                          }
                                          className="bg-white xs:w-44 xs:h-5 text-red"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div>
                              <div className="md:ml-[550px]">
                                <button
                                  className=" bg-lime text-white fixed bottom-0 md:w-[200px] xs:w-full sm:w-[750px] 2xs:w-[260px] rounded-lg sm:h-12"
                                  onClick={handlePayment}
                                >
                                  <p className="p-2 bg-lime rounded-lg xs:text-xs text-md sm:text-2xl">
                                    Total : ₹ {price}
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
