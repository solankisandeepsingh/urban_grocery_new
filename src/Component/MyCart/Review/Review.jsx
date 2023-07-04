import React from "react";
import { Aside } from "../../Aside/Aside";
import { useCartStore } from "../../zustand/useCartStore";
import { useUserStore } from "../../zustand/useUserStore";
import { useNavigate } from "react-router";
import { currencyFormatter } from "../../../utils/utils";

function Review({
  price,
  totalItem,
  setReviewPage,
  setShowModal,

}) {
  const { allCartItems } = useCartStore();
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/payment");
    setReviewPage(false);
    setShowModal(false);
    
  };
  const { addList, deliveryAddress } = useUserStore();

  let { address, area_name, city_name, country } = addList.find((item) => {
    return item.id == deliveryAddress;
  });

  return (
    <>
      <div className="border flex border-light_gray  gap-1 m-4 rounded-md">
        <div className=" xs:w-full">
          <div>
            <div className="h-[700px] flex text-center">
              <div className="max-w-md w-full pt-2  rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-3">Review Details</h2>
                <div className="flex flex-col justify-between h-[90%]">
                  <div>
                    {allCartItems.map((item) => {
                      return (
                        <div class="mt-3 bg-white  xs:p-4 2xs:p-2  ">
                          <div class="flow-root">
                            <ul
                              role="list"
                              class="-my-6 divide-y divide-gray-200"
                            >
                              <li class="flex py-6 bg-white">
                                <div class=" bg-white md:h-12 md:w-12 xs:h-24 xs:w-24 sm:h-48 sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
                                  <img
                                    src={item.image}
                                    alt="product"
                                    class="h-full w-full object-cover object-center bg-white"
                                  />
                                </div>

                                <div class="bg-white ml-4 flex flex-1 flex-col truncate ...">
                                  <div class=" bg-white md:text-sm xs:text-sm sm:text-3xl font-semibold text-gray-900 ">
                                    <p className="bg-white float-left truncate ...">
                                      {item.name}
                                    </p>
                                    <br />

                                    <div className="flex justify-between mt-0.5">
                                      <div className="flex gap-6 w-[70%]">
                                        <div className=" w-1/5 text-left">
                                          <p className="text-xs">
                                            {" "}
                                            {currencyFormatter(
                                              item.discounted_price
                                            )}{" "}
                                          </p>
                                        </div>
                                        <p class="bg-white text-xs text-gryColour">
                                          {" "}
                                          Qty : {item.amount}
                                          {/* {() => setAmount(item.amount)} */}
                                        </p>
                                      </div>
                                      <p class="bg-white text-xs text-gryColour">
                                        {" "}
                                        Total :{" "}
                                        {currencyFormatter(
                                          item.amount * item.discounted_price
                                        )}
                                        {/* {() => setAmount(item.amount)} */}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            {/* {console.log(user_id, "><><><CHECK USER ID BOOLEAN><><><")} */}
                          </div>
                        </div>
                      );
                      // <div className="flex gap-3">
                      //           <img src={item.image} alt="" />
                      //           <p className=""></p>
                      //       </div>
                    })}
                  </div>
                  <div>
                    <div>
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
                    </div>
                    <div className="mb-3 flex justify-between px-5 mt-5">
                      <p className="bg-white text-md font-medium text- mt-5black">
                        Total Items: {totalItem}
                      </p>
                      <p className="bg-white text-md font-medium text-black">
                        Total Price: {currencyFormatter(price)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handlePayment();
                      }}
                      className="bg-lime text-white hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                    >
                      Proceed to Pay
                    </button>
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
