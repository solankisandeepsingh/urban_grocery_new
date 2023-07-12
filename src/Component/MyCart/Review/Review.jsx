import React from "react";
import { Aside } from "../../Aside/Aside";
import { useCartStore } from "../../zustand/useCartStore";
import { useUserStore } from "../../zustand/useUserStore";
import { useNavigate } from "react-router";
import { currencyFormatter } from "../../../utils/utils";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { BsChevronCompactRight } from "react-icons/bs";

function Review({
  price,
  totalItem,
  setReviewPage,
  setShowModal,
  setNavbarOpen,
}) {
  const { allCartItems } = useCartStore();
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/payment");
    setReviewPage(false);
    setShowModal(false);
    setNavbarOpen(false);
  };
  const { addList, deliveryAddress } = useUserStore();

  let { address, area_name, city_name, country, type, name, pincode } =
    addList.find((item) => {
      return item.id == deliveryAddress;
    });

  return (
    <>
      <div className="flex border border-light_gray gap-1 m-4 rounded-md">
        <div className=" xs:w-full">
          <div>
            <div className="h-auto flex text-center">
              <div className="">
                <h2 className="text-2xl font-bold mt-4">Review Details</h2>
                <div className="flex flex-col justify-between h-[90%]">
                  <div>
                    {allCartItems.map((item, index) => {
                      return (
                        <div
                          className={` bg-white ${
                            index === allCartItems.length - 1 ? "mb-[50px]" : ""
                          }  2xs:p-3 border-b-[2px] border-[#e8e8e8]`}
                        >
                          <div className="flow-root">
                            <div role="list" className=" ">
                              <div className="flex p-2 bg-white items-center">
                                <div className=" bg-white md:h-24 md:w-24 xs:h-24 xs:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item?.image}
                                    alt="product"
                                    className="h-full w-full object-cover object-center bg-white"
                                  />
                                </div>

                                <div className="bg-white ml-4 flex flex-1 flex-col truncate ...">
                                  <div className=" bg-white md:text-sm xs:text-sm sm:text-3xl  text-gray-900 ">
                                    <p className="bg-white float-left	 truncate ...">
                                      {item.name}
                                    </p>
                                    <br />

                                    <div className="flex justify-between mt-0.5">
                                      {/* <p className="text-lightgray font-semi-bold">
                                        {item.serve_for}
                                      </p> */}
                                      <div>
                                        {/* <p className="text-left text-lime">
                                          {" "}
                                          {currencyFormatter(
                                            item.discounted_price
                                          )}{" "}
                                        </p> */}

                                        <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-xs text-gryColour  font-medium inline line-through bg-white">
                                          ₹{item.price}.00{" "}
                                        </p>
                                        <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-xs text-black  bg-white">
                                          {/* ₹{item.discounted_price}.00{" "} */}
                                          {currencyFormatter(
                                            item.discounted_price
                                          )}
                                        </span>
                                        <p className="bg-white text-gryColour text-left text-[12px] font-bold">
                                          {" "}
                                          {item?.measurement + " "}
                                          {item?.unit}
                                        </p>
                                      </div>
                                      <p className="bg-white text-gryColour text-[12px] font-bold">
                                        Qty: {item?.amount}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* {console.log(user_id, "><><><CHECK USER ID BOOLEAN><><><")} */}
                          </div>
                        </div>
                        // <div className="mt-3 bg-white  xs:p-4 2xs:p-2  ">
                        //   <div className="flow-root">
                        //     <ul
                        //       role="list"
                        //       className="-my-6 divide-y divide-gray-200"
                        //     >
                        //       <li className="flex py-6 bg-white">
                        //         <div className=" bg-white md:h-12 md:w-12 xs:h-24 xs:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
                        //           <img
                        //             src={item.image}
                        //             alt="product"
                        //             className="h-full w-full object-cover object-center bg-white"
                        //           />
                        //         </div>

                        //         <div className="bg-white ml-4 flex flex-1 flex-col truncate ...">
                        //           <div className=" bg-white md:text-sm xs:text-sm sm:text-3xl font-semibold text-gray-900 ">
                        //             <p className="bg-white float-left truncate ...">
                        //               {item.name}
                        //             </p>
                        //             <br />

                        //             <div className="flex justify-between mt-0.5">
                        //               <div className="flex gap-6 w-[70%]">
                        //                 <div className=" w-1/5 text-left">
                        //                   <p className="text-xs">
                        //                     {" "}
                        //                     {currencyFormatter(item.discounted_price)}{" "}
                        //                   </p>
                        //                 </div>
                        //                 <p className="bg-white text-xs text-gryColour">
                        //                   {" "}
                        //                   Qty : {item.amount}
                        //                   {/* {() => setAmount(item.amount)} */}
                        //                 </p>
                        //               </div>
                        //               <p className="bg-white text-xs text-gryColour">
                        //                 {" "}
                        //                 Total :{" "}
                        //                 { currencyFormatter(item.amount * item.discounted_price)}
                        //                 {/* {() => setAmount(item.amount)} */}
                        //               </p>
                        //             </div>
                        //           </div>
                        //         </div>
                        //       </li>
                        //     </ul>
                        //     {/* {console.log(user_id, "><><><CHECK USER ID BOOLEAN><><><")} */}
                        //   </div>
                        // </div>
                      );
                    })}
                  </div>
                  <div>
                    <p className="text-[black] text-left px-3 pb-3">
                      Deliver To:{" "}
                    </p>
                    <div className="  border-[2px] border-[#e8e8e8] flex mb-[25%] px-3 py-3 mt-1 gap-1 m-4 rounded-md">
                      <div className="flex gap-2 ">
                        <div className="w-[5%]">
                          {type === "Home" ? (
                            <FaHome className="inline ml-3 mb-1" />
                          ) : (
                            <HiOfficeBuilding className="inline ml-3 mb-1" />
                          )}
                        </div>
                        <div className="w-[85%] flex flex-col ml-4">
                          <div className="font-medium text-left">
                            {type === "Home" ? "Home" : "Work"}
                          </div>
                          <div className=" text-left text-[#8d9191] ">
                            <span className="gap-2 ">{name} -</span>
                            <span className="">{address}, </span>
                            <span className="">{area_name}, </span>
                            <span className="">{city_name}, </span>
                            <span className="">{pincode}, </span>
                            <span className="">{country} </span>
                          </div>
                        </div>
                        {/* <div className="w-[10%] flex gap-4 items-center"></div> */}
                      </div>
                    </div>

                    {/* <div>
                      <p className="bg-white  text-sm font-medium ">
                        <span className="text-[gray]">Deliver to:</span>{" "}
                        {address +
                          " " +
                          area_name +
                          " " +
                          city_name +
                          " " +
                          country}
                      </p>
                    </div> */}

                    {/* <div className="mb-3 flex justify-between px-5 mt-5">
                      <p className="bg-white text-md font-medium text-black ">
                        Total Items: {totalItem}
                      </p>
                      <p className="bg-white text-md font-medium text-lime">
                        Total Price: {currencyFormatter(price)}
                      </p>
                    </div> */}

                    <button
                      className="flex justify-between mt-5 mb-1 bg-lime p-3 text-white fixed bottom-0 md:w-[350px] xs:w-[350px] sm:w-[750px] 2xs:w-[260px] rounded-lg"
                      onClick={() => {
                        handlePayment();
                      }}
                    >
                      <p className="p-2 bg-lime text-xl font-bold rounded-lg">
                        Total : {currencyFormatter(price)}
                      </p>
                      <div className="flex items-center justify-center min-w-max">
                        <p className="py-2 bg-lime text-xl  rounded-lg">
                          Proceed to Pay
                        </p>
                        <BsChevronCompactRight className="te" />
                      </div>
                    </button>

                    {/* <button
                      onClick={() => {
                        handlePayment();
                      }}
                      className="bg-lime text-white hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                    >
                      Proceed to Pay
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
