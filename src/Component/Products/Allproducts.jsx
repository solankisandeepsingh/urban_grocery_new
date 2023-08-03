import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { mockProduct } from "../../Models/MockProduct";
import CartQuantity from "../Button/CartQuantity";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { useProductsStore } from "../zustand/useProductsStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useApiStore } from "../zustand/useApiStore";
import { currencyFormatter } from "../../utils/utils";

function Allproducts({ }) {
  const { allProducts, setAllProducts } = useProductsStore();
  const { setisLoading } = useLoaderState();
  console.log(allProducts, setAllProducts);
  const { allCartItems, setAllCartItems,  variant, setVariant } = useCartStore();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { jwt, setJwt } = useApiStore();
  const navigate = useNavigate();

  const mockData = [
    {
      id: "906",
      name: "Artisanal Dark Sugar Free Chocolate Bar",
      indicator: "0",
      image: "http://grocery.intelliatech.in/upload/images/2877-2023-02-17.png",
      ratings: "4.0",
      number_of_ratings: "1",
      total_allowed_quantity: "0",
      slug: "artisanal-dark-sugar-free-chocolate-bar-1",
      description:
        "<ul>\r\n<li>Sugarfree Chocolates</li>\r\n<li>Weight : 460 gm</li>\r\n</ul>",
      status: "1",
      category_name: "Chocolate",
      tax_percentage: "0",
      price: "999",
      is_favorite: false,
      variants: [
        {
          type: "packet",
          id: "870",
          product_id: "906",
          price: "999",
          discounted_price: "980",
          serve_for: "Sold Out",
          stock: "0",
          measurement: "2",
          measurement_unit_name: "pack",
          stock_unit_name: "kg",
          images: [
            "http://grocery.intelliatech.in/upload/images/2877-2023-02-17.png",
          ],
          cart_count: "0",
          is_flash_sales: false,
          flash_sales: [
            {
              price: "",
              discounted_price: "",
              start_date: "",
              end_date: "",
              is_start: false,
            },
          ],
        },
        {
          type: "packet",
          id: "871",
          // product_id: "907",
          product_id: "906",
          price: "500",
          discounted_price: "100",
          serve_for: "Available",
          stock: "79",
          measurement: "1",
          measurement_unit_name: "pack",
          stock_unit_name: "kg",
          images: [
            "https://www.telegraph.co.uk/content/dam/news/2020/07/23/TELEMMGLPICT000235668291_trans_NvBQzQNjv4BqhNkvlguSCLNAbLFJA3hmlxSyV74PnrmMVLeDsGCONQM.jpeg",
          ],
          cart_count: "0",
          is_flash_sales: true,
          flash_sales: [
            {
              price: "500",
              discounted_price: "100",
              start_date: "2023-02-17 15:30:10",
              end_date: "2023-02-27 15:30:16",
              is_start: true,
            },
          ],
        },
      ],
    },
    {
      id: "917",
      name: "Murruku - Vacuum fried",
      indicator: "1",
      image: "http://grocery.intelliatech.in/upload/images/5075-2023-02-17.jpg",
      ratings: "0.0",
      number_of_ratings: "0",
      total_allowed_quantity: "0",
      slug: "murruku-vacuum-fried",
      description:
        "<p>Murukku is a versatile vacuum fried and extremely popular anytime snack especially in south India.</p>\r\n<p>They are often served as a tea time snack or even served along with food. Usually, Murukku are not spicy but very flavorful from the cumin seeds and asafoetida, crunchy and delicious snack.</p>",
      status: "1",
      category_name: "Snacks",
      tax_percentage: "18",
      price: "100",
      is_favorite: false,
      variants: [
        {
          type: "packet",
          id: "881",
          product_id: "917",
          price: "100",
          discounted_price: "10",
          serve_for: "Available",
          stock: "16",
          measurement: "100",
          measurement_unit_name: "gm",
          stock_unit_name: "kg",
          images: [
            "http://grocery.intelliatech.in/upload/images/5075-2023-02-17.jpg",
          ],
          cart_count: "0",
          is_flash_sales: false,
          flash_sales: [
            {
              price: "",
              discounted_price: "",
              start_date: "",
              end_date: "",
              is_start: false,
            },
          ],
        },
        {
          type: "packet",
          id: "879",
          // product_id: "915",
          product_id: "917",
          price: "500",
          discounted_price: "9",
          serve_for: "Available",
          stock: "37",
          measurement: "500",
          measurement_unit_name: "gm",
          stock_unit_name: "kg",
          images: [
            "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=789&q=80",
          ],
          cart_count: "0",
          is_flash_sales: false,
          flash_sales: [
            {
              price: "",
              discounted_price: "",
              start_date: "",
              end_date: "",
              is_start: false,
            },
          ],
        },
      ],
    },
    {
      id: "902",
      name: "Dairy Milk Chocolate Basket",
      indicator: "0",
      image: "http://grocery.intelliatech.in/upload/images/4779-2023-02-17.jpg",
      ratings: "3.0",
      number_of_ratings: "1",
      total_allowed_quantity: "0",
      slug: "dairy-milk-chocolate-basket-1",
      description:
        "<ul>\r\n<li>Chocolate: Dairy Milk chocolate (13 gm each)</li>\r\n<li>No of Chocolate: 10</li>\r\n<li>Packing: Blue Net Packing</li>\r\n<li>Base: Wooden Basket</li>\r\n</ul>",
      status: "1",
      category_name: "Chocolate",
      tax_percentage: "0",
      price: "599",
      is_favorite: false,
      variants: [
        {
          type: "packet",
          id: "866",
          product_id: "902",
          price: "599",
          discounted_price: "140",
          serve_for: "Available",
          stock: "881",
          measurement: "1",
          measurement_unit_name: "pack",
          stock_unit_name: "pack",
          images: [],
          cart_count: "0",
          is_flash_sales: true,
          flash_sales: [
            {
              price: "599",
              discounted_price: "580",
              start_date: "2023-02-17 15:30:10",
              end_date: "2023-02-27 15:30:16",
              is_start: true,
            },
          ],
        },
      ],
    },
  ];



  const handleVariantChange = (id, e) => {
    console.log(variant);
    console.log(e.target.value);

    let updatedvariant = { ...variant, [id]: e.target.value };

    setVariant(updatedvariant);
  };

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
            data.product_id === item.id
              ? {
                  ...data,
                  amount: data.amount + 1,
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
  const addItemUI = (mainItem) => {
    console.log(mainItem);

    let newArr = [
      ...allCartItems,
      {
        ...mainItem.variants[variant[mainItem.id] || 0],
        amount: 1,
        name: mainItem.name,
        image: mainItem.variants[variant[mainItem.id] || 0].images[0],
        product_variant_id: mainItem.variants[variant[mainItem.id] || 0].id,
      },
    ];

    console.log(newArr, "FROM ADD ITEM UI");
    setAllCartItems(newArr);
  };

  return (
    <>
      <div className="mt-20 xs:grid xs:grid-cols-2 md:grid md:grid-cols-6 sm:grid-cols-3 flex flex-wrap xs:ml-7  md:ml-5 sm:ml-16 ">
        {allProducts &&
          allProducts.map((item) => {
            return (
              <>
               <div
                    className="w-72  xs:my-3 xs:w-36  xs:h-auto md:w-40 md:h-[235px] sm:h-[250px] sm:w-[170px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green bg-[#FFFAED] cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/subcategory-details/${item.category_name}/product-details/${item.id}`
                      );
                    }}
                  >
                    <img
                      // className="w-full h-56 xs:w-48 xs:h-28 object-cover object-center  md:h-24 md:ml-[23px] md:w-28 md:mt-4 sm:w-48 sm:h-32 rounded-lg "
                      className="w-full h-56 xs:w-48 xs:h-28 object-cover object-center  md:h-28 md:w-40 sm:w-48 sm:h-32 rounded-lg "
                      src={
                        item.variants.length == 1
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
                    {item.variants.length == 1 &&
                      item.variants.map((data) => {
                        return (
                          <div className="flex p-1 md:px-3 flex-col xs:justify-center xs:items-center xs:text-center md:justify-evenly sm:ml-0   ">
                            {/* {console.log(allFavItems.find((fav)=>{
                              console.log(fav.id, item.id, "HEREEEEEEEEEEEEE<><><><><><>");
                               return fav.id === item.id
                            }))}; */}

                            {/* ADD TO FAVOURITES  */}
                            {/* {user_id != 14 &&
                              (allFavItems.find((fav) => {
                                return fav.id === item.id;
                              }) ? (
                                <FaHeart
                                  className="text-red absolute top-2 text-xl animate-hbeat hover:scale-125 transition-all  right-2 "
                                  onClick={(e) => {
                                    setFavPos((prev)=> !prev)
                                    e.stopPropagation();
                                    handleRemoveFavorite(item);
                                  }}
                                />
                              ) : (
                                <FaRegHeart
                                  className={`text-[light_gray] group-hover:top-2 group-active:top-2 absolute ${!favPos ? '-top-5' : 'top-2'} text-xl hover:scale-125  transition-all right-2`}
                                  onClick={(e) => {
                                    setFavPos((prev)=> !prev)
                                    e.stopPropagation();
                                    handleAddFavorite(item);
                                  }}
                                />
                              ))} */}
                            <div className="  w-full md:px-3 ">
                              <p className="2xs:text-base xs:text-sm t sm:text-xl  md:text-sm font-light  px-1 py-1 flex md:flex-row  justify-between items-center">
                                <span className=" font-bold text-xs">
                                  {currencyFormatter(data.price)}{" "}
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
                                        console.log(
                                          e,
                                          "EVENT IN IMMEDIATE PARENT ELEMENT"
                                        );
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
                    {item.variants.length > 1 && (
                      <div className=" md:flex md:flex-col px-3 md:justify-evenly  sm:flex xs:flex xs:justify-between ">
                        {/* ADD TO FAVOURITES  */}
                        {/* {user_id != 14 &&
                          (allFavItems.find((fav) => {
                            return fav.id === item.id;
                          }) ? (
                            <FaHeart
                              className="text-red absolute top-2 text-xl animate-hbeat hover:scale-125 transition-all  right-2 "
                              onClick={(e) => {
                                setFavPos((prev)=> !prev)
                                e.stopPropagation();
                                handleRemoveFavorite(item);
                              }}
                            />
                          ) : (
                            <FaRegHeart
                              className={`text-[light_gray] group-hover:top-2 group-active:top-2 absolute ${!favPos ? '-top-5' : 'top-2'} text-xl hover:scale-125  transition-all right-2`}
                              onClick={(e) => {
                                setFavPos((prev)=> !prev)
                                e.stopPropagation();
                                handleAddFavorite(item);
                              }}
                            />
                          ))} */}

                        <div className="" onClick={(e) => e.stopPropagation()}>
                          <select
                            // value={"selectedVariant"}
                            onChange={(e) => {
                              handleVariantChange(item.id, e);
                            }}
                            className="block w-full py-2 px-1 items-center border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs text-center font-bold"
                          >
                            {/* <option value="">City</option> */}
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

                        {/* <div className=" xs:text-left  sm:mt-2 md:mt-[15px] md:mx-4 xs:mx-4 sm:mx-4 md:text-left ">
                          <p className="2xs:text-base  xs:text-sm t sm:text-xl  xs:mt-4 md:mt-[-3px] sm:mt-[12px] md:text-sm text-gryColour font-light bg-white">
                            ₹{item.variants[0].price}{" "}
                          </p>
                        </div> */}

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
                                <div
                                  className="mt-3"
                                  // onClick={(e) => {
                                  //   console.log(
                                  //     e,
                                  //     "EVENT IN IMMEDIATE PARENT ELEMENT"
                                  //   );
                                  // }}
                                >
                                  <CartQuantity
                                    item={item}
                                    variant={variant}
                                    // setAllCartItems={setAllCartItems}
                                    // allCartItems={allCartItems}
                                    // user_id={user_id}
                                  />
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
    </>
  );
}

export default Allproducts;
