import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { mockProduct } from "../../../Models/MockProduct";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CartQuantity from "../../Button/CartQuantity";
import axios from "axios";
import { API_TOKEN } from "../../Token/Token";

export const ProductCarousel = ({ name, setAddItem, addItem }) => {
  const navigate = useNavigate();
  // const [allproduct, setShowAllProducts] = useState(mockProduct.data);
  const [showAllProduct, setShowAllProducts] = useState([]);
  // const [showQtybtn, setShowQtybtn] = useState(false);

  const productCarousels = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    var bodyFormdata = new FormData();
    bodyFormdata.append("accesskey", "90336");
    bodyFormdata.append("get_all_products", "1");
    bodyFormdata.append("limit", "37");

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/get-all-products.php",
        bodyFormdata,
        config
      )
      .then((res) => {
        setShowAllProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    productCarousels();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  const addItemHandler = (item, data) => {
    // console.log("item1>>>>>>>>>>>>>>", addItem);
    console.log("item", item);
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    console.log(data.id, "varaitn id");
    console.log(item.id, "main id");
    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");

    bodyFormData.append("product_id", `${data.id}`);
    bodyFormData.append("product_variant_id", `${item.id}`);

    // const qtys = (item.qty || 0) + 1;

    bodyFormData.append("qty", 1);

    // console.log("item", qtys);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        console.log(res, "res add item");
        // setAddItem(res)
        if (addItem.some((cartItem) => cartItem.product_id === item.id)) {
          // console.log("addtiem", addItem);
          setAddItem((cart) =>
            cart.map((data) =>
              data.product_id === item.id
                ? {
                    ...data,
                    amount: data.amount + 1,
                  }
                : data
            )
          );
          return;
        }
        console.log(item.id, "Additem Id in product caraousel");
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
          user_id: "14",
        };
        setAddItem((cart) => [...cart, { ...item1, amount: 1 }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewAllProducts = () => {
    navigate("/allproducts");
  };

  return (
    <div className="mt-14 pb-5">
      <div className="xs:my-5 mt-20 flex justify-between">
        <div className="text-customBlack text-[24px]">
          <h1 className="font-okra font-600">All Proudcts</h1>
        </div>
        <div className=" text-customGreen text-[20px]	">
          <h1 className="cursor-pointer font-okra font-600" onClick={viewAllProducts}>
            View All
          </h1>
        </div>
      </div>

      <div className="md:mt-5 ">
        <Carousel responsive={responsive}>
          {showAllProduct &&
            showAllProduct.map((item) => {
              return (
                <>
                  <div className="w-72 xs:w-40 xs:h-[265px] md:w-40 md:h-[230px] sm:h-[280px] rounded-xl md:mt-4 container border border-light_gray hover:border-light_green shadow-lg bg-white">
                    <NavLink
                      to={`/subcategory-details/${item.category_name}/product-details/${item.id}`}
                    >
                      <img
                        className="w-full h-56 xs:w-32 xs:h-32 xs:m-3 xs:ml-3.5 md:h-24 md:ml-[23px] md:w-28 md:mt-4 rounded-lg bg-white"
                        src={item.image}
                        alt={item.name}
                      />
                    </NavLink>
                    <div className="py-4 xs:mb-[-10px]  md:mx-4 xs:mx-4 sm:mx-4 bg-white">
                      <p className="md:text-sm xs:text-sm sm:text-2xl font-medium bg-white truncate ...">
                        {item.name}
                      </p>
                  
                    </div>
                    {item &&
                      item.variants.map((data) => {
                        return (
                          <div className="md:flex md:justify-evenly sm:flex xs:flex xs:justify-between xs:mr-4">
                            <div className=" xs:text-left sm:mt-2 md:mt-[15px] md:mx-4 xs:mx-4 sm:mx-4 md:text-left ">
                              <p className="2xs:text-base xs:text-sm sm:text-xl xs:mt-4 md:mt-[-3px] sm:mt-[12px] md:text-sm text-black font-light bg-white">
                                ₹{data.price}{" "}
                              </p>
                            </div>

                            <div>
                              {item.variants.some(
                                (variant) => variant.stock > 0
                              ) ? (
                                addItem.find(
                                  (i) => i.product_id === item.id
                                ) ? (
                                  <>
                                    <div className="md:mt-2 md:ml-6 xs:mt-2.5 sm:mt-4 ">
                                      {console.log(
                                        item,
                                        "Item",
                                        addItem,
                                        "addItem",
                                        "In ProductCarousel, calling CartQuantity"
                                      )}
                                      <CartQuantity
                                        item={item}
                                        setAddItem={setAddItem}
                                        addItem={addItem}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="md:w-16 md:h-8 mb-3 xs:w-18 sm:ml-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                    onClick={() => addItemHandler(data, item)}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className=" bg-white text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:mb-4 sm:text-xs  xs:text-xs">
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
