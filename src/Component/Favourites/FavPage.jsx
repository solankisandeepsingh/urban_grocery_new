import React from "react";
import { useFavStore } from "../zustand/useFavStore";
import { currencyFormatter } from "../../utils/utils";
import CartQuantity from "../Button/CartQuantity";
import { useLoaderState } from "../zustand/useLoaderState";
import { useUserStore } from "../zustand/useUserStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/useCartStore";
import axios from "../../api/axios";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useApiToken } from "../zustand/useApiToken";
import { ToastContainer, toast } from "react-toastify";

export const FavPage = () => {
  const { allCartItems, setAllCartItems, variant, setVariant } = useCartStore();

  const [removeFavPos, setRemoveFavPos] = useState(true);
  const navigate = useNavigate();
  const { apiToken } = useApiToken();

  const {
    userInfo: { user_id },
  } = useUserStore();
  const { setisLoading } = useLoaderState();
  const { allFavItems, setAllFavItems } = useFavStore();

  const handleVariantChange = (id, e) => {
    let updatedvariant = { ...variant, [id]: e.target.value };

    setVariant(updatedvariant);
  };

  const handleRemoveFavorite = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let favData = new FormData();
    favData.append("accesskey", "90336");
    favData.append("remove_from_favorites", "1");
    favData.append("user_id", user_id);
    favData.append("product_id", item.id);
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/favorites.php`,
        favData,
        config
      )
      .then((res) => {
        setisLoading(false);
        let newArrRemove = allFavItems.filter((fav) => {
          return fav.id !== item.id;
        });

        setAllFavItems(newArrRemove);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

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
        autoClose:500,
        
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

    axios
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
          autoClose:500
          
        });
        setAllCartItems(newArr);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  const handleFavClick = () => {
    navigate("/allproducts");
  };
  return (
    <>
      <div>
        {allFavItems?.length > 0 && (
          <div className="grid xs:grid-cols-2 md:grid-cols-6 sm:grid-cols-4 mt-24 xs:mx-9 xs:gap-4 sm:mx-14 sm:gap-6 md:gap-5 ">
            {allFavItems?.length > 0 &&
              allFavItems?.map((item) => {
                return (
                  <>
                    <div
                      className="w-72  xs:w-36  xs:h-auto md:w-40 md:h-[260px] sm:h-[284px] sm:w-[170px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green bg-[#FFFAED] cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/subcategory-details/${item?.category_name}/product-details/${item?.id}`
                        );
                      }}
                    >
                      <img
                        className="w-full h-56 xs:w-48 xs:h-28 object-cover object-center  md:h-28  md:w-40  sm:w-48 sm:h-32 rounded-lg "
                        src={
                          item?.variants?.length == 1
                            ? item?.image
                            : item?.variants[variant[item?.id] || 0].images[0]
                        }
                        alt={item.name}
                      />
                      <div className=" pt-2 md:py-2 md:mx-4 xs:mx-2 sm:mx-4 ">
                        <p className="md:text-sm xs:text-sm sm:text-[20px]  font-medium   truncate ">
                          {item?.name}
                        </p>
                      </div>
                      {item?.variants?.length == 1 &&
                        item?.variants.map((data) => {
                          return (
                            <div className="flex p-1 md:px-3 flex-col xs:justify-center xs:items-center xs:text-center md:justify-evenly sm:ml-0   ">
                              {user_id != 14 &&
                                (allFavItems.find((fav) => {
                                
                                  return fav.id === item.id;
                                }) ? (
                                  <AiOutlineCloseCircle
                                    className="text-red relative top-[-150px] xs:top-[-140px] xs:left-14 sm:top-[-150px] sm:left-16 sm:text-[30px] left-16 md:text-[22px] text-xl animate-hbeat hover:scale-125 transition-all cursor-pointer "
                                    onClick={(e) => {
                                      setRemoveFavPos(true);
                                      e.stopPropagation();
                                      handleRemoveFavorite(item);
                                    }}
                                  />
                                ) : null)}
                              <div className="  w-full md:px-3 ">
                                <p className="2xs:text-base xs:text-sm t sm:text-xl  md:text-sm font-light  px-1 py-1 flex md:flex-row  justify-between items-center">
                                  <span className=" font-bold text-xs">
                                    {currencyFormatter(data?.price)}{" "}
                                  </span>
                                  <div>
                                    <span className="text-gryColour text-xs">
                                      {data?.measurement}{" "}
                                    </span>
                                    <span className="font-normal text-gryColour text-xs  ">
                                      {data?.measurement_unit_name}
                                    </span>
                                  </div>
                                </p>
                              </div>

                              <div className="w-full ">
                                {item?.variants?.some(
                                  (variant) => variant.stock > 0
                                ) ? (
                                  allCartItems?.find(
                                    (i) => i.product_id === item.id
                                  ) ? (
                                    <>
                                      <div className="mt-3">
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
                    </div>
                  </>
                );
              })}
          </div>
        )}
        {!(allFavItems?.length > 0) && (
          <div className="mt-36 flex flex-col justify-center items-center text-center">
            {/* <p className="mt-32 font-bold text-[24px] ml-[450px]"> */}
            <p className="text-[24px] font-semibold">
              YOUR FAVOURTIES LIST IS EMPTY
            </p>
            <div className="my-4">
              <p className="text-gryColour ">
                Add items that you like to your Favourties list.{" "}
              </p>
              <p className="text-gryColour">
                Review them anytime and easily move them to the Mycart.
              </p>
            </div>

            <button
              className="  mt-3 md:text-sm hover:bg-lime hover:text-white  text-lime border border-lightgreen bg-transparent w-[200px] h-[50px] hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
              onClick={handleFavClick}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};
