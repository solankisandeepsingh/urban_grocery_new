import React, { useEffect, useState } from "react";
import DropdownMenu from "../AccountDropdown/DropdownMenu";
import { FaTrash } from "react-icons/fa";
import CartQuantity from "../Button/CartQuantity";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaBell, FaHome, FaRegAddressBook, FaWallet } from "react-icons/fa";
import { QtyAmount } from "../Button/QtyAmount";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";

export const MyOrder = ({
  isOpen,
  setIsOpen,
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
      <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 md:mt-[-22px]  bg-white">
        <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="md:flex md:flex-row">
        <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:py-36 md:mt-10">
          <ul className="font-medium xs:invisible md:visible md:fixed">
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/address"}>
                <a
                  to="/address"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="text-darkgray text-lg" />
                  <span className="ml-3 text-light_gray xs:text-xs font-light">
                    My Address
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg ">
              <NavLink to={"/myorder"}>
                <a
                  to="/myorder"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressBook className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3 text-lightgray xs:text-xs font-thin">
                    My Order
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/wallet"}>
                <a
                  to="/wallet"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaWallet className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    My Wallet
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/"}>
                <a
                  to="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBell className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    Logout
                  </span>
                </a>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="md:w-3/4 xs:w-full md:mt-[-30px] xs:mt-[-270px] ">
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
