import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { mockProduct } from "../../../Models/MockProduct";
import DropdownMenu from "../../AccountDropdown/DropdownMenu";
import CartQuantity from "../../Button/CartQuantity";
import axios from "axios";
import { API_TOKEN } from "../../Token/Token";

export const SubCategory = ({ setAddItem, addItem, isOpen, setIsOpen }) => {
  // const [allproducts, setAllProducts] = useState(mockProduct.data);
  const [allproducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category_id } = useParams();
  
  let config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  var bodyFormData = new FormData();
  bodyFormData.append("accesskey", "90336");
  bodyFormData.append("category_id", category_id);

  useEffect(() => {
    const fetchData = () => {
      axios
        .post(
          "https://grocery.intelliatech.in/api-firebase/get-products-by-category-id.php",
          bodyFormData,
          config
        )
        .then((res) => {
          console.log(res.data.data);  
          setAllProducts(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {}, [allproducts, category_id]);

  const addItemHandler = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
  
    var bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "21");
    bodyFormData.append("product_id", item.variants[0].product_id);
    bodyFormData.append("product_variant_id", item.variants[0].id);
    console.log(bodyFormData);

    axios
    .post(
      "https://grocery.intelliatech.in/api-firebase/get-products-by-subcategory-id.php",
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
      <div>
        <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 md:mt-[-22px] xs:mt-3 bg-white">
          <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="grid md:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2 2xs:grid-cols-1 mt-20 px-5 gap-4 md:gap-2 ">
          {isLoading ? (
            <p className="m-auto">Loading...</p>
          ) : allproducts && allproducts.length > 0 ? (
            allproducts.map((item) => {
              return (
                <div className="bg-white md:w-44 md:h-[240px] xs:h-[235px] sm:h-[310px] sm:w-56 mt-5 md:ml-4 rounded-2xl border border-light_gray hover:border-light_green cursor-pointer transform transition-all hover:scale-105 ">
                  <NavLink to={`product-details/${item.id}`}>
                    <img
                      className="xs:w-32 xs:m-3.5 xs:h-28 md:w-28 md:h-24 md:m-4 md:ml-7 sm:w-48 sm:h-36 sm:ml-4 sm-ml-10 rounded-md bg-white"
                      src={item.image}
                      alt="product"
                    />
                  </NavLink>

                  <div className="sm:-pl-2 xs:pl-2 bg-white mt-2">
                    <p className="xs:text-sm md:text-sm sm:text-xl md:font-light md:tracking-tight bg-white truncate ...">
                      {item.name}
                    </p>
                    {item.variants.map((data) => {
                      return (
                        <div className="flex flex-col bg-white">
                          <div>
                            <p className="text-lime text-lg xs:text-xs md:text-sm sm:text-xl sm:mt-1 font-normal md:mt-2 bg-white">
                              ₹{data.price}{" "}
                            </p>
                          </div>
                          <div className="md:flex justify-between xs:flex">
                            <div className="md:mt-4 xs:mt-4">
                              <p className="text-lg xs:text-xs md:text-xs sm:text-lg font-light md:mb-4 text-lava_grey bg-white">
                                Discount: ₹{data.discounted_price}{" "}
                              </p>
                            </div>

                            <div>
                              {item.variants.some(
                                (variant) => variant.stock > 0
                              ) ? (
                                addItem.find((i) => i.id === item.id) ? (
                                  <>
                                    <div className="md:mt-2 xs:mt-3 xs:mr-[12px] sm:mt-2 ">
                                      <CartQuantity
                                        item={item}
                                        setAddItem={setAddItem}
                                        addItem={addItem}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="my-1 w-24 xs:w-14 xs:mr-2 xs:text-xs md:w-16 md:h-10 md:text-base md:mb-3 md:mr-2 sm:w-[80px] sm:h-12 sm:mr-3 sm:text-lg text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm py-2.5 sm:py-2 text-center"
                                    onClick={() => addItemHandler(item)}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className="text-orange text-sm xs:text-xs md:text-xs font-medium mt-4 xs:mr-2 md:mr-3 sm:text-lg sm:mr-1 bg-white">
                                  Out of stock
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="m-auto">No result found.</p>
          )}
        </div>
      </div>
    </>
  );
};
