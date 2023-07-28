import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CartQuantity from "../../Button/CartQuantity";
import axios from "axios";
import { API_TOKEN } from "../../Token/Token";
import { useCartStore } from "../../zustand/useCartStore";
import { useUserStore } from "../../zustand/useUserStore";
import { useLoaderState } from "../../zustand/useLoaderState";
import { useApiStore } from "../../zustand/useApiStore";
// import { useNavigate } from "react-router-dom";

export const ProductCarousel = ({}) => {
  const { allCartItems, setAllCartItems } = useCartStore();
  console.log(allCartItems, "After Destructure");
  const [showAllProduct, setShowAllProducts] = useState([]);
  const navigate = useNavigate();
  const { jwt, setJwt } = useApiStore();

  const {
    userInfo: { user_id },
  } = useUserStore();
  const { setisLoading } = useLoaderState();


  const productCarousels = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", "90336");
    bodyFormdata.append("get_all_products", "1");
    bodyFormdata.append("limit", "37");
    setisLoading(true);
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/get-all-products.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        setShowAllProducts(res.data.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    productCarousels();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },

      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const addItemHandler = (item, data) => {
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
    bodyFormData.append("qty", 1);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then(console.log(allCartItems, "[before some method]"))
      .then((res) => {
        // setisLoading(false);
        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          let newArr = allCartItems.map((data) =>
            data.product_id === item.id
              ? {
                  ...data,
                  amount: data.amount + 1,
                }
              : data
          );
          console.log(newArr);
          setAllCartItems(newArr);
          // setAllCartItems((cart) =>
          //   cart.map((data) =>
          //     data.product_id === item.id
          //       ? {
          //           ...data,
          //           amount: data.amount + 1,
          //         }
          //       : data
          //   )
          // );
          return;
        }
        console.log(item.id, "Additem Id in product caraousel");

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

  const viewAllProducts = () => {
    navigate("/allproducts");
  };

  return (
    <div className="xs:mt-4 xs:p-2 md:mt-7 shadow-sm border border-[#e8e8e8] rounded-md md:p-5 bg-[#fcfff3]">
      <div className="xs:my-5 mt-20 flex justify-between">
        <div className="text-customBlack text-[24px]">
          <h1 className="font-okra font-600">All Proudcts</h1>
        </div>
        <div className=" text-customGreen text-[20px]	">
          <h1
            className="cursor-pointer font-okra font-600"
            onClick={viewAllProducts}
          >
            View All
          </h1>
        </div>
      </div>

      <div className="md:my-2 ">
        <Carousel responsive={responsive}>
          {showAllProduct &&
            showAllProduct.map((item) => {
              return (
                <>
                  <div
                    className="w-72 xs:w-24  xs:h-auto md:w-40 md:h-[235px] sm:h-[250px] sm:w-[170px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green  bg-white cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/subcategory-details/${item.category_name}/product-details/${item.id}`
                      );
                    }}
                  >
                    <img
                      className="w-full h-56 xs:w-48 xs:h-16 md:h-24 md:ml-[23px] md:w-28 md:mt-4 sm:w-48 sm:h-32 rounded-lg bg-white"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className=" xs:py-2 md:mx-4 xs:mx-2 sm:mx-4 bg-white">
                      <p className="md:text-sm xs:text-sm sm:text-[20px]  font-medium bg-white truncate ...">
                        {item.name}
                      </p>
                    </div>
                    {item &&
                      item.variants.map((data) => {
                        return (
                          <div className="flex flex-col xs:justify-center xs:items-center xs:text-center sm:flex-row md:justify-evenly sm:ml-0  sm:mr-4 ">
                            <div className=" xs:text-left sm:mt-2 md:mt-[15px] md:mx-4  sm:mx-4 md:text-left ">
                              <p className="2xs:text-base xs:text-sm t sm:text-xl md:mt-[-3px] sm:mt-[12px] md:text-sm text-gryColour font-light bg-white">
                                ₹{data.price}{" "}
                              </p>
                            </div>

                            <div>
                              {item.variants.some(
                                (variant) => variant.stock > 0
                              ) ? (
                                allCartItems?.find(
                                  (i) => i.product_id === item.id
                                ) ? (
                                  <>
                                    <div
                                      className="md:mt-2 md:ml-6 sm:mt-4"
                                      onClick={(e) => {
                                        console.log(
                                          e,
                                          "EVENT IN IMMEDIATE PARENT ELEMENT"
                                        );
                                      }}
                                    >
                                      <CartQuantity item={item} />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="md:w-16 md:h-8 mb-3 xs:w-14 sm:ml-2 md:text-xs md:mt-2  sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      return addItemHandler(data, item);
                                    }}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className=" bg-white text-orange md:text-[11px] text-sm font-medium md:mt-4 pb-4 sm:text-xs xs:text-[11px] sm:my-[25px] sm:text-[11px]  sm:break-normal">
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
        </Carousel>
      </div>
    </div>
  );
};
