import React, { useEffect, useState } from "react";
import axios from "axios";
import CartQuantity from "../Button/CartQuantity";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { currencyFormatter } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { useApiToken } from "../zustand/useApiToken";
import axiosInstance from "../../api/axiosInstance";

export const FlashSales = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const { allCartItems, setAllCartItems, variant, setVariant } = useCartStore();

  const { apiToken } = useApiToken();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { setisLoading } = useLoaderState();
  const navigate = useNavigate();

  const handleSalesClick = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    var salesData = new FormData();
    salesData.append("accesskey", "90336");
    salesData.append("get-all-flash-sales-products", 1);

    axiosInstance
      .post(
        "https://grocery.intelliatech.in/api-firebase/flash-sales.php",
        salesData,
        config
      )
      .then((res) => {
        setSalesProducts(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (apiToken) handleSalesClick();
  }, [apiToken]);

  const addItemUI = (mainItem) => {
    let newArr = [];
    if (mainItem?.variants?.length > 1) {
      newArr = [
        ...allCartItems,
        {
          ...mainItem.variants[variant[mainItem.id] || 0],
          amount: 1,
          name: mainItem.name,
          image: mainItem.variants[variant[mainItem.id] || 0].images[0],
          product_variant_id: mainItem.variants[variant[mainItem.id] || 0].id,
        },
      ];
    } else {
      toast.success("Item added to user cart successfully !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });

      newArr = [
        ...allCartItems,
        {
          ...mainItem.variants[variant[mainItem.id] || 0],
          amount: 1,
          name: mainItem.name,
          image: mainItem.image,
          product_variant_id: mainItem.variants[variant[mainItem.id] || 0].id,
        },
      ];
    }
    setAllCartItems(newArr);
  };
  const addItemHandler = (item, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", `${data.id}`);
    bodyFormData.append("product_variant_id", `${item.id}`);
    bodyFormData.append("qty", 1);
    setisLoading(true);

    axiosInstance
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          let newArr = allCartItems.map((data) =>
            data.product_id === item.id
              ? {
                  ...data,
                  amount: data.amount + 1,
                }
              : data
          );
          setAllCartItems(newArr);

          return;
        }

        let item1 = {
          amount: 1,
          discounted_price: item.discounted_price,
          id: item.id,
          price: item.price,
          product_id: item.product_id,
          product_variant_id: item.id,
          qty: 1,
          user_id: user_id,
        };

        let newArr = [...allCartItems, { ...item1, amount: 1 }];
        toast.success("Item added to user cart successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
        setAllCartItems(newArr);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Network Error. Please check your connection and try again.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setisLoading(false);
      });
  };
  const handleVariantChange = (id, e) => {
    let updatedvariant = { ...variant, [id]: e.target.value };

    setVariant(updatedvariant);
  };
 
  return (
    <>
      <div className="md:mt-7  shadow-sm border border-[#e8e8e8] rounded-md p-2 bg-[#fcfff3]">
        <div className="text-customBlack text-[24px] p-2">
          <h1 className="font-okra font-600">Flash Sales</h1>
        </div>
        <div className="md:my-2 md:flex md:gap-4 md:flex-wrap xs:flex xs:gap-3 ">
          {salesProducts &&
            salesProducts?.map((item) => {
              return (
                <>
                  <div
                    className="w-72  xs:my-3 xs:w-36  xs:h-auto md:w-40 md:h-[280px] sm:h-[352px] sm:w-[210px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green bg-[#ffffff] cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/subcategory-details/${item.category_name}/product-details/${item.id}`
                      );
                    }}
                  >
                    <img
                      className="w-full h-56 xs:w-48 xs:h-28 object-cover object-center  md:h-28 md:w-40 sm:w-56 sm:h-36 rounded-lg "
                      src={
                        item?.variants?.length == 1
                          ? item.image
                          : item.variants[variant[item.id] || 0].images[0]
                      }
                      alt={item.name}
                    />
                    <div className=" pt-2 md:py-2 md:mx-4 xs:mx-2 sm:mx-4 ">
                      <p className="md:text-sm xs:text-sm sm:text-[20px]  font-medium   truncate ">
                        {item.name}
                      </p>
                    </div>
                    {item?.variants?.length == 1 &&
                      item.variants.map((data) => {
                        return (
                          <div className="flex p-1 md:px-3 flex-col xs:justify-center xs:items-center xs:text-center md:justify-evenly sm:ml-0   ">
                            <div className="">
                              <div className="flex gap-2 mx-4 md:mx-4 sm:gap-3 sm:mx-6 ">
                                <p className="2xs:text-base xs:text-sm sm:text-xl md:text-sm text-gryColour  font-medium inline line-through bg-white">
                                  ₹{data.price}.00{" "}
                                </p>
                                <p className="text-xs sm:text-xl xs:text-sm  md:text-sm text-black  bg-white">
                                  ₹{data.discounted_price}.00{" "}
                                </p>
                              </div>
                              <p className="text-lime xs:mx-4 md:mx-4 md:my-0.5 md:text-[15px] sm:mx-6 text-lg font-bold xs:text-sm  sm:text-xl md:text-xs bg-white">
                                You save ₹{data.price - data.discounted_price}
                                .00
                              </p>
                            </div>
                            <div className="  w-full md:px-3 ">
                              <p className="2xs:text-base xs:text-sm t sm:text-xl  md:text-sm font-light  px-1 py-1 flex md:flex-row  justify-between items-center">
                                <span className=" font-bold text-xs">
                                  {data.serve_for}
                                </span>
                                <div>
                                  <span className="text-gryColour text-xs">
                                    {data.measurement}{" "}
                                  </span>
                                  <span className="font-normal text-gryColour text-xs  ">
                                    {data.measurement_unit_name}
                                  </span>
                                </div>
                              </p>
                            </div>

                            <div className="w-full ">
                              {item.variants.some(
                                (variant) => variant.stock > 0
                              ) ? (
                                allCartItems?.find(
                                  (i) => i.product_id === item.id
                                ) ? (
                                  <>
                                    <div
                                      className="mt-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <CartQuantity
                                        item={item}
                                        variant={variant}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className=" md:h-8 mt-2 md:mt-3 md:text-base !leading-none   sm:h-10 sm:text-xs  text-lime border border-lightgreen bg-transparent w-full hover:bg-opacity-75 font-medium bg-white rounded-lg uppercase px-3 py-1.5 "
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      user_id
                                        ? addItemHandler(data, item)
                                        : addItemUI(item);
                                    }}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className="  text-orange md:text-[11px] text-sm font-medium md:mt-4 pb-4 sm:text-xs xs:text-[11px] sm:my-[25px] sm:text-[11px]  sm:break-normal">
                                  Out of stock
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    {item?.variants?.length > 1 && (
                      <div className=" md:flex md:flex-col px-3 md:justify-evenly  sm:flex xs:flex xs:justify-between ">
                        <div className="" onClick={(e) => e.stopPropagation()}>
                          <select
                            onChange={(e) => {
                              handleVariantChange(item.id, e);
                            }}
                            className="block w-full py-2 px-1 items-center border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs text-center font-bold"
                          >
                            {item.variants.map((variant, index) => (
                              <option
                                key={variant.id}
                                value={index}
                                className=" my-2 items-center text-center text-xs font-bold"
                              >
                                <span className="p-5">
                                  {currencyFormatter(variant.price)}{" "}
                                </span>
                                <span>{variant.measurement} </span>
                                <p className="font-normal text-blue border">
                                  {variant.measurement_unit_name}
                                </p>
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          {item.variants.some(
                            (variant) => variant.stock > 0
                          ) ? (
                            allCartItems?.find(
                              (i) =>
                                (i.product_variant_id ?? i.id) ===
                                item?.variants?.[variant?.[item?.id] || 0]?.id
                            ) ? (
                              <>
                                <div className="mt-3">
                                  <CartQuantity item={item} variant={variant} />
                                </div>
                              </>
                            ) : (
                              <button
                                className=" md:h-8 mt-3 md:text-xs   sm:h-10 sm:text-base  text-lime border border-lightgreen bg-transparent w-full hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  user_id
                                    ? addItemHandler(variant, item)
                                    : addItemUI(item);
                                }}
                              >
                                Add
                              </button>
                            )
                          ) : (
                            <p className="  text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:text-xs  xs:text-xs">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
