import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import CartQuantity from "../Button/ProductBtn";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const FlashSales = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const { allCartItems, setAllCartItems } = useCartStore();
  const { jwt, setJwt } = useApiStore();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { setisLoading } = useLoaderState();
  const navigate = useNavigate();


  const handleSalesClick = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

  const allCartItemsHandler = (item, data) => {
    // console.log("item1>>>>>>>>>>>>>>", allCartItems);
    console.log("item", item);
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    // console.log(data.id, "varaitn id");
    // console.log(item.id, "main id");
    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", `${data.id}`);
    bodyFormData.append("product_variant_id", `${item.id}`);

    // const qtys = (item.qty || 0) + 1;

    bodyFormData.append("qty", 1);

    // console.log("item", qtys);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        setisLoading(false);
        console.log(res, "res add item");
        // setallCartItems(res)
        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          // console.log("addtiem", allCartItems);
          let newArr = allCartItems.map((data) =>
            data?.product_id === item?.id
              ? {
                  ...data,
                  amount: data?.amount + 1,
                }
              : data
          );
          console.log(newArr);
          setAllCartItems(newArr);

          return;
        }
        console.log(item.id, "allCartItems Id in product caraousel");

        let item1 = {
          amount: 1,
          discounted_price: item.discounted_price,
          id: item.id,
          image: data.image,
          images: [
            "http://grocery.intelliatech.in/upload/variant_images/1676618514.4521-883.png",
          ],
          price: item.price,
          product_id: item.product_id,
          product_variant_id: item.id,
          qty: 1,
          save_for_later: "0",
          serve_for: "Available",
          slug: "butterscotch-flavorsome-cake",
          stock: "29",

          type: "packet",
          unit: "gm",
          user_id: user_id,
        };

        let newArr = [...allCartItems, { ...item1, amount: 1 }];
        console.log(newArr);
        // setAllCartItems((cart) => [...cart, { ...item1, amount: 1 }]);
        setAllCartItems(newArr);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };
  return (
    <>
      <div className="mt-7 shadow-sm border border-[#e8e8e8] rounded-md p-5 bg-[#fcfff3] mb-3">
        <div className="text-customBlack text-[24px]">
          <h1 className="font-okra font-600">Flash Sales</h1>
        </div>
        <div className="md:my-2 flex gap-4 flex-wrap">
          {salesProducts &&
            salesProducts.map((item) => {
              return (
                <>
                  <div className="w-72 xs:w-40 xs:h-[265px] md:w-40 md:h-[270px] sm:h-[280px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green  bg-white cursor-pointer">
                    <div
                      className="p-2 xs:mb-[-10px]  md:mx-4 xs:mx-4 sm:mx-4 bg-white"
                      onClick={() => {
                        navigate(
                          `/subcategory-details/${item.category_name}/product-details/${item.id}`
                        );
                      }}
                    >
                      <p className="md:text-sm xs:text-sm sm:text-2xl font-medium bg-white">
                        {item.flash_sales_Name}
                      </p>
                    </div>
                    <img
                      className="w-full h-56 xs:w-32 xs:h-32 xs:m-3 xs:ml-3.5 md:h-24 md:ml-[23px] md:w-28 md:mt-4 rounded-lg bg-white"
                      src={item.image}
                      alt={item.name}
                      onClick={() => {
                        navigate(
                          `/subcategory-details/${item.category_name}/product-details/${item.id}`
                        );
                      }}
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
                              <p className="2xs:text-base xs:text-sm  md:ml-4  sm:text-xl md:text-sm text-gryColour  font-medium inline line-through bg-white">
                              ₹{data.price}.00{" "}
                           
                              </p>
                                <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-sm text-black  bg-white">
                                  ₹{data.discounted_price}.00{" "}
                                </span>
                            </div>
                            <div className="flex justify-between text-center items-center">
                              <div className="md:ml-2">
                                <p>{data.serve_for}</p>
                              </div>
                              <div>
                                {allCartItems &&
                                allCartItems.find(
                                  (i) => i.product_id === item.id
                                ) ? (
                                  <>
                                    <div className="md:mt-2 md:ml-6 xs:mt-2.5 sm:mt-4 w-14 ">
                                      <CartQuantity item={item} />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="md:w-14 md:h-8 mb-3 xs:w-18 sm:ml-2 md:mr-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                    onClick={() =>
                                      allCartItemsHandler(data, item)
                                    }
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
