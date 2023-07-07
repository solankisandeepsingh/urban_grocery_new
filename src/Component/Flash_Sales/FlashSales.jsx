import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import CartQuantity from "../Button/ProductBtn";
import { useNavigate } from "react-router-dom";

export const FlashSales = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const navigate = useNavigate();

  const handleSalesClick = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    var salesData = new FormData();
    salesData.append("accesskey", "90336");
    salesData.append("get-all-flash-sales-products", 1);
    // setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/flash-sales.php",
        salesData,
        config
      )
      .then((res) => {
        console.log(res);

        setSalesProducts(res?.data?.data);
        // setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setisLoading(false);
      });
  };
  useEffect(() => {
    handleSalesClick();
  }, []);
  return (
    <>
      <div className="mt-7 shadow-sm border border-[#e8e8e8] rounded-md p-5 bg-[#fcfff3] mb-3">
        <div className="text-customBlack text-[24px]">
          <h1 className="font-okra font-600">Flash Sales</h1>
        </div>
        <div className="md:my-2 flex gap-3 flex-wrap">
          {salesProducts &&
            salesProducts.map((item) => {
              return (
                <>
                  <div
                    className="w-72 xs:w-40 xs:h-[265px] md:w-40 md:h-[260px] sm:h-[280px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green  bg-white cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/subcategory-details/${item.category_name}/product-details/${item.id}`
                      );
                    }}
                  >
                    <div className="p-2 xs:mb-[-10px]  md:mx-4 xs:mx-4 sm:mx-4 bg-white">
                      <p className="md:text-sm xs:text-sm sm:text-2xl font-medium bg-white">
                        {item.flash_sales_Name}
                      </p>
                    </div>
                    <img
                      className="w-full h-56 xs:w-32 xs:h-32 xs:m-3 xs:ml-3.5 md:h-24 md:ml-[23px] md:w-28 md:mt-4 rounded-lg bg-white"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="xs:mb-[-10px]  md:mx-4 xs:mx-4 sm:mx-4 bg-white">
                      <p className="md:text-sm xs:text-sm sm:text-2xl font-medium bg-white truncate ...">
                        {item.name}
                      </p>
                    </div>
                    {item.variants &&
                      item.variants.map((data) => {
                        return (
                          <>
                            <div>
                              <p className="text-lime  md:mx-4 py-3  text-lg font-bold xs:text-sm  sm:text-xl md:text-xs bg-white">
                                You save ₹{data.price - data.discounted_price}
                                .00
                              </p>
                              <p className="2xs:text-base xs:text-sm  md:mx-4  sm:text-xl md:text-sm text-black font-medium  bg-white">
                                ₹{data.discounted_price}.00{" "}
                                <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-sm text-gryColour line-through bg-white">
                                  ₹{data.price}.00{" "}
                                </span>
                              </p>
                            </div>
                          </>
                        );
                      })}
                   

                    <div>
                      <button className="md:w-16 md:h-8 mb-3 xs:w-18 sm:ml-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center">
                        add
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
