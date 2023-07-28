import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Header/Search/Search";
import CartQuantity from "./Button/CartQuantity";
import { useCartStore } from "./zustand/useCartStore";

function FilterData({ data, name, setName, setData, setAddItem, addItem }) {
  const {allCartItems,setAllCartItems}= useCartStore();
  console.log(allCartItems,"allcartitem is here")
  
  const addItemHandler = (item) => {
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
  };
  return (
    <div className="md:mt-10 pb-[1000px]">
      <div className="md:invisible xs:visible ">
        <Search setName={setName} setData={setData} />
      </div>
     
      <div className=" xs:grid xs:grid-cols-2 md:grid md:grid-cols-7 sm:grid-cols-3 flex flex-wrap md:ml-5  ">
     
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <>
                <div className="w-72 xs:w-40 md:w-44 rounded-xl xs:m-2 xs:my-3 md:mx-5 md:my-4 sm:w-60 sm:my-4 container shadow-sm bg border border-light_gray hover:border-light_green">
                  <NavLink
                    to={`/subcategory-details/${item.category_name}/product-details/${item.id}`}
                  >
                    <img
                      className="w-full h-56 xs:w-32 xs:h-24 xs:m-3 xs:mx-4 md:w-36 md:h-28 md:mx-4 md:m-2 sm:w-40 sm:h-32 sm:m-8 rounded-lg bg-white"
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
                          <div className=" sm:mt-2 md:mt-[-10px] px-3 bg-white">
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
                            <div className="xs:flex  xs:justify-between md:flex md:justify-between">
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
                                        <div className="md:mt-3 md:ml-10 xs:mt-3 xs:ml-7 ">
                                          <CartQuantity
                                            item={item}
                                            setAddItem={setAddItem}
                                            addItem={addItem}
                                          />
                                        </div>

                                        <div>
                                          {addItem &&
                                            addItem.map((e) => {
                                              return (
                                                <div key={e.id}>
                                                  <p className="md:text-sm xs:text-sm sm:text-2xl mt-1 bg-lime">
                                                    {item.amount}
                                                  </p>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </>
                                    ) : (
                                      <button
                                        className="my-2 w-24 xs:w-12 xs:mr-2 xs:text-xs xs:ml-[35px] md:w-16 md:h-9 md:mb-4 md:ml-10 md:mr-2 text-lime border border-lightgreen bg-transparent hover:bg-opacity-75 font-medium rounded-lg text-sm  py-2.5 text-center"
                                        onClick={() => addItemHandler(item)}
                                      >
                                        Add
                                      </button>
                                    )
                                  ) : (
                                    <p className="bg-white text-orange my-[18px] xs:ml-4 xs:mb-2 md:ml-10 text-sm md:text-xs font-medium sm:text-xl">
                                      Out of stock
                                    </p>
                                  )}
                                </div>
                              </div>

                              
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            );
          })
        ) : (
          <div className="text-center justify-center items-center h-[100vh] w-[100vw]">
            <div className="w-[50%] border-[1px] shadow-md  self-center m-auto bg-[#EDEDED] rounded-lg py-[70px]">
              <p className="xs:text-xl md:text-3xl mb-3">No product found.</p>
              <p className="xs:text-sm md:text-lg text-[gray]">
                Please try a differnet search
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterData;
