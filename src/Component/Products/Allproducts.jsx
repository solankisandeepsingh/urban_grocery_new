import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mockProduct } from "../../Models/MockProduct";
import CartQuantity from "../Button/CartQuantity";
import DropdownMenu from "../AccountDropdown/DropdownMenu";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";

function Allproducts({ name, addItem, setAddItem, isOpen, setIsOpen }) {
  // const [allproduct, setShowAllProducts] = useState(mockProduct.data);
  const [allproduct, setShowAllProducts] = useState([]);

  let allshowProduct = () => {
    
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
      .then((res) => setShowAllProducts(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    allshowProduct();
  }, []);

  const addItemHandler = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
  
    var bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");
    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].product_id);
    bodyFormData.append("qty", item.amount);
  
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        if (addItem.some((cartItem) => cartItem.id === item.id)) {
          setAddItem((cart) =>
            cart.map((data) =>
              data.id === item.id
                ? {
                    ...data,
                    amount: data.amount + 1,
                  }
                : data
            )
          );
          return;
        }
  
        setAddItem((cart) => [...cart, { ...item, amount: 1 }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 md:mt-[-22px] bg-white">
        <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="mt-20 xs:grid xs:grid-cols-2 md:grid md:grid-cols-6 sm:grid-cols-3 flex flex-wrap md:ml-5 ">
        {allproduct &&
          allproduct.map((item) => {
            return (
              <>
                <div className="w-72 xs:w-40 md:w-44  md:h-[280px] sm:w-60 sm:h-[365px]  rounded-xl xs:m-2 xs:my-3 md:mx-5 md:my-4 sm:my-4 container shadow-sm bg border border-light_gray hover:border-light_green">
                  <NavLink
                    to={`/subcategory-details/${item.category_name}/product-details/${item.id}`}
                  >
                    <img
                      className="w-full h-56 xs:w-32 xs:h-24 xs:m-3 xs:mx-4 md:w-36 md:h-28 md:mx-4 md:m-2 sm:w-40 sm:h-32 sm:m-8 rounded-lg"
                      src={item.image}
                      alt={name}
                    />
                  </NavLink>
                  <div className="md:py-4 px-3 bg-white">
                    <p className="text-xl font-light truncate ... xs:text-xs sm:text-xl md:text-sm bg-white">
                      {item.name}
                    </p>
                  </div>

                  {item &&
                    item.variants.map((data) => {
                      return (
                        <>
                          <div className="sm:mt-2 md:mt-[-10px] px-3 bg-white">
                            <p className="text-lime text-lg font-bold xs:text-sm  sm:text-xl md:text-xs bg-white">
                              You save ₹{data.price - data.discounted_price}
                              .00
                            </p>
                            <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-sm text-black font-medium md:mt-1 sm:mt-2 bg-white">
                              ₹{data.discounted_price}.00{" "}
                              <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-sm text-black line-through bg-white">
                                ₹{data.price}.00{" "}
                              </span>
                            </p>
                            <div className="md:flex xs:flex ">
                              <div>
                                <p className="bg-white 2xs:text-base xs:text-sm xs:mt-4 sm:text-xl md:text-sm  mt-1 font-light">
                                  {data.measurement}
                                  {data.measurement_unit_name}
                                </p>
                              </div>

                              <div>
                                {item.variants.some(
                                  (variant) => variant.stock > 0
                                ) ? (
                                  addItem.find((i) => i.id === item.id) ? (
                                    <>
                                      <div className="md:mt-3 md:ml-10 xs:mt-3 xs:ml-10 sm:ml-16">
                                        <CartQuantity
                                          item={item}
                                          setAddItem={setAddItem}
                                          addItem={addItem}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      className="my-2 w-24 xs:w-14 xs:mr-2 xs:text-xs xs:ml-[35px] md:w-16 md:h-10 md:mb-4 md:p-0 md:ml-10 md:mr-2 sm:w-20 sm:h-[45px] sm:ml-[50px] sm:text-base text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm  py-2.5 text-center"
                                      onClick={() => addItemHandler(item)}
                                    >
                                      Add
                                    </button>
                                  )
                                ) : (
                                  <p className="bg-white text-orange my-[18px] xs:ml-3 xs:mb-2 md:ml-10 text-sm md:text-xs font-medium sm:text-xl">
                                    Out of stock
                                  </p>
                                )}
                              </div>
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
    </>
  );
}

export default Allproducts;
