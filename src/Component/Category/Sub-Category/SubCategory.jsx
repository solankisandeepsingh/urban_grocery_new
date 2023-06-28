import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CartQuantity from "../../Button/CartQuantity";
import axios from "axios";
import { API_TOKEN } from "../../Token/Token";

export const SubCategory = ({ setAddItem, addItem}) => {
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

  // const addItemHandler = (item) => {
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   };

  //   var bodyFormData = new FormData();
  //   bodyFormData.append("accesskey", "90336");
  //   bodyFormData.append("add_to_cart", "1");
  //   bodyFormData.append("user_id", "21");
  //   bodyFormData.append("product_id", item.variants[0].product_id);
  //   bodyFormData.append("product_variant_id", item.variants[0].id);
  //   console.log(bodyFormData);

  //   axios
  //   .post(
  //     "https://grocery.intelliatech.in/api-firebase/get-products-by-subcategory-id.php",
  //     bodyFormData,
  //     config
  //   )
  //     .then((res) => {
  //       console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //       if (addItem.some((cartItem) => cartItem.id === item.id)) {
  //         setAddItem((cart) =>
  //           cart.map((data) =>
  //             data.id === item.id
  //               ? {
  //                   ...data,
  //                   amount: data.amount + 1,
  //                 }
  //               : data
  //           )
  //         );
  //         return;
  //       }

  //       setAddItem((cart) => [...cart, { ...item, amount: 1 }]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

  return (
    <>
      
      <div>
        <div className="mt-20 xs:grid xs:grid-cols-2 md:grid md:grid-cols-6 sm:grid-cols-3 flex flex-wrap md:ml-5 ">
          {isLoading ? (
            <p className="m-auto">Loading...</p>
          ) : allproducts && allproducts.length > 0 ? (
            allproducts.map((item) => {
              return (
                <div className="w-72 xs:w-40 md:w-44 md:h-[246px] sm:w-60 sm:h-[365px]  rounded-xl xs:m-2 xs:my-3 md:mx-5 md:my-4 sm:my-4 container shadow-sm bg border-2 border-light_gray hover:border-light_green">
                  <NavLink to={`product-details/${item.id}`}>
                    <img
                      className="w-full h-56 xs:w-32 xs:h-24 xs:m-3 xs:mx-4 md:w-36 md:h-28 md:mx-4 md:m-2 sm:w-40 sm:h-32 sm:m-8 rounded-lg"
                      src={item.image}
                      alt="product"
                    />
                  </NavLink>

                  <div className="sm:-pl-2 xs:pl-2 bg-white mt-2">
                    <div className="md:py-1 px-3 bg-white">
                      <p className="text-xl font-medium truncate ... xs:text-xs sm:text-xl md:text-sm bg-white">
                        {item.name}
                      </p>
                    </div>

                    {item &&
                      item.variants.map((data) => {
                        return (
                          <>
                            <div className="sm:mt-2 md:mt-[-1px] px-3 bg-white">
                              <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-sm text-black font-medium md:mt-1 sm:mt-2 bg-white">
                                ₹{data.discounted_price}.00{" "}
                                <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-sm text-gryColour line-through bg-white">
                                  ₹{data.price}.00{" "}
                                </span>
                              </p>
                              <div className="md:flex xs:flex justify-between ">
                                <div>
                                  <p className="bg-white 2xs:text-base xs:text-sm xs:mt-4 sm:text-xl md:text-xs text-gryColour  mt-1 font-light">
                                    {data.measurement}
                                    {data.measurement_unit_name}
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
                                        onClick={() =>
                                          addItemHandler(data, item)
                                        }
                                      >
                                        Add
                                      </button>
                                    )
                                  ) : (
                                    <p className=" bg-white text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:mb-4 sm:text-xs xs:text-xs">
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
