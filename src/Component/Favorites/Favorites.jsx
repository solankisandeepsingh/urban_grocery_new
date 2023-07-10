import React, { useEffect, useState } from "react";
import { useFavStore } from "../zustand/useFavStore";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";

export const Favorites = () => {
  const { allFavItems, setAllFavItems } = useFavStore();
  const [favItems, setFavItems]=useState([])
  const {isLoading, setisLoading} = useLoaderState();
  const {
    userInfo: { user_id, name },
    setUserInfo,
  } = useUserStore();



 const getFavItems = () => {
    var favData = new FormData();
    favData.append("accesskey", "90336");
    favData.append("get_favorites", "1");
    favData.append("user_id", `${user_id}`);

    const config = {
     headers: {
       Authorization: `Bearer ${API_TOKEN}`,
     },
   };
    setisLoading(true);
    

    return axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/favorites.php",
        favData,
        config
      )
      .then((res) => {
        console.log(res, "favrite itemmmmmmmmmmmm");
        setAllFavItems(res?.data?.data);
        setFavItems(res?.data?.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  useEffect(()=>{getFavItems()},[])    

  return (
    <>
      <div className="mt-20 px-3">
        <h1 className="text-black text-2xl mx-5">
          Your fav items
        </h1>
        {favItems.length > 0 ? (
          <div className=" xs:grid xs:grid-cols-2 md:grid md:grid-cols-6 sm:grid-cols-3 flex flex-wrap ">
            {allFavItems &&
              allFavItems.map((item) => {
                return (
                  <>
                    <div className="w-72 xs:w-40 md:w-44  md:h-[263px] sm:w-60 sm:h-[365px]  rounded-xl xs:m-2 xs:my-3 md:mx-5 md:my-4 sm:my-4 container shadow-sm bg border-2 border-light_gray hover:border-light_green">
                      <NavLink
                        to={`/subcategory-details/${item.category_name}/product-details/${item.id}`}
                      >
                        <img
                          className="w-full h-56  xs:h-24  object-cover  md:h-28    sm:h-32  rounded-lg"
                          src={item.image}
                          // alt={name}
                        />
                      </NavLink>
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
                                <p className="text-lime text-lg font-bold xs:text-sm  sm:text-xl md:text-xs bg-white">
                                  You save ₹{data.price - data.discounted_price}
                                  .00
                                </p>
                                <p className="2xs:text-base xs:text-sm  sm:text-xl md:text-sm text-black font-medium md:mt-1 sm:mt-2 bg-white">
                                  ₹{data.discounted_price}.00{" "}
                                  <span className="text-xs sm:text-xl xs:text-sm xs:ml-1 md:text-sm text-gryColour line-through bg-white">
                                    ₹{data.price}.00{" "}
                                  </span>
                                </p>
                                <div className="md:flex xs:flex justify-between ">
                                  <div>
                                    <p className="bg-white 2xs:text-base xs:text-sm xs:mt-4 sm:text-xl md:text-xs text-gryColour mt-1 font-light">
                                      {data.measurement}
                                      {data.measurement_unit_name}
                                    </p>
                                  </div>

                                  {/* <div>
                              {item.variants.some(
                                (variant) => variant.stock > 0
                              ) ? (
                                allCartItems.find(
                                  (i) => i.product_id === item.id
                                ) ? (
                                  <>
                                    <div className="md:mt-2 md:ml-6 xs:mt-2.5 sm:mt-4 ">
                                      {console.log(
                                        item,
                                        "Item",
                                        allCartItems,
                                        "allCartItems",
                                        "In ProductCarousel, calling CartQuantity"
                                      )}
                                      <CartQuantity
                                        item={item}
                                        // setallCartItems={setallCartItems}
                                        // allCartItems={allCartItems}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="md:w-16 md:h-8 mb-3 xs:w-18 sm:ml-2 md:text-xs md:mt-2 xs:mt-2 sm:w-16 sm:h-10 sm:text-base sm:mt-[15px] text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                    onClick={() => allCartItemsHandler(data, item)}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p className=" bg-white text-orange md:text-[11px] text-sm font-medium mt-4 pb-4 sm:mb-4 sm:text-xs xs:text-xs">
                                  Out of stock
                                </p>
                              )}
                            </div> */}
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
        ) : (
          <div>
            <p>No Favourites to show</p>
          </div>
        )}
      </div>
    </>
    // <div className="relative z-1 flex justify-center items-center flex-wrap my-10 w-[300px] h-[300px] rounded-lg first-letter">
    // 	<div className="card">
    // 		<div className="content">
    // 			<div className="imgBx">
    // 				<img src="https://image.flaticon.com/icons/png/256/4213/4213732.png" />
    // 			</div>
    // 			<div className="contentBx">
    // 				<h3>Lion<br /><span>Happy Birthday</span></h3>
    // 			</div>
    // 		</div>
    // 		<ul className="sci">
    // 			<li>
    // 				<a href="">happy</a>
    // 			</li>
    // 			<li>
    // 				<a href="">birth</a>
    // 			</li>
    // 			<li>
    // 				<a href="">day</a>
    // 			</li>
    // 		</ul>
    // 	</div>
    //   </div>
  );
};
