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
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavStore } from "../../zustand/useFavStore";
import { currencyFormatter } from "../../../utils/utils";

export const ProductCarousel = ({}) => {
  const { allCartItems, setAllCartItems } = useCartStore();

  const [showAllProduct, setShowAllProducts] = useState([]);
  const [variant, setVariant] = useState({ 0: 0 });
  const [favPos, setFavPos] = useState(false);
  const navigate = useNavigate();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { setisLoading } = useLoaderState();
  const { allFavItems, setAllFavItems } = useFavStore();

  const [fav, setFav] = useState();

  const handleVariantChange = (id, e) => {
    console.log(e.target.value);
    setVariant((prev)=> {
      return {...prev, [id]:e.target.value}
    });
  };

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
      "id": "902",
      "name": "Dairy Milk Chocolate Basket",
      "indicator": "0",
      "image": "http://grocery.intelliatech.in/upload/images/4779-2023-02-17.jpg",
      "ratings": "3.0",
      "number_of_ratings": "1",
      "total_allowed_quantity": "0",
      "slug": "dairy-milk-chocolate-basket-1",
      "description": "<ul>\r\n<li>Chocolate: Dairy Milk chocolate (13 gm each)</li>\r\n<li>No of Chocolate: 10</li>\r\n<li>Packing: Blue Net Packing</li>\r\n<li>Base: Wooden Basket</li>\r\n</ul>",
      "status": "1",
      "category_name": "Chocolate",
      "tax_percentage": "0",
      "price": "599",
      "is_favorite": false,
      "variants": [
          {
              "type": "packet",
              "id": "866",
              "product_id": "902",
              "price": "599",
              "discounted_price": "140",
              "serve_for": "Available",
              "stock": "881",
              "measurement": "1",
              "measurement_unit_name": "pack",
              "stock_unit_name": "pack",
              "images": [],
              "cart_count": "0",
              "is_flash_sales": true,
              "flash_sales": [
                  {
                      "price": "599",
                      "discounted_price": "580",
                      "start_date": "2023-02-17 15:30:10",
                      "end_date": "2023-02-27 15:30:16",
                      "is_start": true
                  }
              ]
          }
      ]
  }
  ];

  // console.log(mockData.variants);

  const getAllProducts = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
    getAllProducts();
  }, [user_id]);

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
      items: 2,
    },
  };
  const handleRemoveFavorite = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
        console.log(res, "favdata");
        setisLoading(false);
        setFavPos((prev) => !prev);

        let newArr = allFavItems.filter((fav) => {
          return fav.id !== item.id;
        });
        console.log(newArr);
        setAllFavItems(newArr);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const handleAddFavorite = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    let favData = new FormData();
    favData.append("accesskey", "90336");
    favData.append("add_to_favorites", "1");
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
        setFavPos((prev) => !prev);

        console.log(res, "favdata");
        let newArr = [...allFavItems, item];
        console.log(newArr);
        setAllFavItems(newArr);
      })
      .catch((err) => {
        setisLoading(false);

        console.log(err);
      });
  };

  const addItemUI = (mainItem) => {
    // if (allCartItems.some((cartItem) => cartItem.product_variant_id === mainItem.variants[variant[mainItem.id]].id || 0)) {
    //   let newArr = allCartItems.map((data) =>
    //     data.product_id === item.id
    //       ? {
    //           ...data,
    //           amount: data.amount + 1,
    //         }
    //       : data
    //   );
    //   console.log(newArr);
    //   // setAllCartItems(newArr);
    //   return;
    // }

    console.log(mainItem);

    // let item1 = {
    //   amount: 1,
    //   discounted_price: item.discounted_price,
    //   id: item.id,
    //   price: item.price,
    //   product_id: item.product_id,
    //   product_variant_id: item.id,
    //   qty: 1,
    //   user_id: user_id,
    // };

    let newArr = [...allCartItems, { ...mainItem.variants[variant[mainItem.id]||0], amount: 1, name: mainItem.name, image: mainItem.variants[variant[mainItem.id]||0].images[0] }];
    console.log(newArr, "FROM ADD ITEM UI");
    // setAllCartItems((cart) => [...cart, { ...item1, amount: 1 }]);
    setAllCartItems(newArr);
  };

  const addItemHandler = (item, data) => {
    console.log("item", item);
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
    <div className="mt-7 shadow-sm border border-[#e8e8e8] rounded-md p-5 bg-[#fcfff3]">
      <div className="xs:my-5 mt-20 flex justify-between">
        <div className="text-customBlack text-[24px]">
          <h1 className="font-okra font-600">All Proudcts</h1>
          <button onClick={()=>console.log(variant)} className="font-okra font-600">click</button>
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
          {mockData &&
            mockData.map((item) => {
              return (
                <>
                  <div
                    className="group w-72 relative xs:w-40 xs:h-[265px] md:w-40 md:h-[235px] sm:h-[280px] rounded-xl md:mt-4 container border-2 border-light_gray hover:border-light_green  bg-white cursor-pointer overflow-hidden"
                    onClick={() => {
                      navigate(
                        `/subcategory-details/${item.category_name}/product-details/${item.id}`
                      );
                    }}
                  >
                    <img
                      className="w-full h-56 xs:w-32 xs:h-32 xs:m-3 xs:ml-3.5 md:h-24 md:ml-[23px] md:w-28 md:mt-4 rounded-lg bg-white"
                      src={item.variants.length == 1 ? item.image :item.variants[variant[item.id] || 0].images[0]}
                      alt={item.name}
                    />
                    <div className="py-4 xs:mb-[-10px]  md:mx-4 xs:mx-4 sm:mx-4 bg-white">
                      <p className="md:text-sm xs:text-sm sm:text-2xl font-medium bg-white truncate ...">
                        {item.name}
                      </p>
                    </div>
                    {item.variants.length == 1 &&
                      item.variants.map((data) => {
                        // {console.log(data ,"variatne data")}
                        return (
                          <div className=" md:flex md:justify-evenly  sm:flex xs:flex xs:justify-between xs:mr-4">
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

                            <div className=" xs:text-left  sm:mt-2 md:mt-[15px] md:mx-4 xs:mx-4 sm:mx-4 md:text-left ">
                              <p className="2xs:text-base  xs:text-sm t sm:text-xl  xs:mt-4 md:mt-[-3px] sm:mt-[12px] md:text-sm text-gryColour font-light bg-white">
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
                                      className="md:mt-2 md:ml-6 xs:mt-2.5 sm:mt-4"
                                      onClick={(e) => {
                                        console.log(
                                          e,
                                          "EVENT IN IMMEDIATE PARENT ELEMENT"
                                        );
                                      }}
                                    >
                                      <CartQuantity
                                        item={item}
                                        variant= {variant}
                                        // setAllCartItems={setAllCartItems}
                                        // allCartItems={allCartItems}
                                        // user_id={user_id}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="md:w-16 md:h-8 mb-3 xs:w-18 sm:ml-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addItemUI(item);
                                      // return addItemHandler(data, item);
                                    }}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className=" bg-white text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:text-xs  xs:text-xs">
                                  Out of stock
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    {item.variants.length > 1 &&
                      <div className=" md:flex md:justify-evenly  sm:flex xs:flex xs:justify-between ">
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
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {/* <option value="">City</option> */}
                            {item.variants.map((variant, index) => (
                              <option key={variant.id} value={index}>
                                {currencyFormatter(variant.price)}{" "}
                                {variant.measurement}{" "}
                                {variant.measurement_unit_name}
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
                              (i) => i.id === item?.variants?.[variant?.[item?.id] || 0]?.id
                            ) ? (
                              <>
                                <div
                                  className="md:mt-2 md:ml-6 xs:mt-2.5 sm:mt-4"
                                  // onClick={(e) => {
                                  //   console.log(
                                  //     e,
                                  //     "EVENT IN IMMEDIATE PARENT ELEMENT"
                                  //   );
                                  // }}
                                >
                                  <CartQuantity
                                    item={item}
                                    variant= {variant}
                                    // setAllCartItems={setAllCartItems}  
                                    // allCartItems={allCartItems}
                                    // user_id={user_id}
                                  />
                                </div>
                              </>
                            ) : (
                              <button
                                className="md:w-16 md:h-8 mb-3 xs:w-18 sm:ml-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addItemUI(item);
                                  // return addItemHandler(data, item);
                                }}
                              >
                                Add
                              </button>
                            )
                          ) : (
                            <p className=" bg-white text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:text-xs  xs:text-xs">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                </>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};
