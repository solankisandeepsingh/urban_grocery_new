import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

function CartQuantity({ item, variant }) {
  const { allCartItems, setAllCartItems } = useCartStore();
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { jwt, setJwt } = useApiStore();

  const changeQuantity = (change) => {
    if (change == "increase") {
      if (user_id) {
        console.log("USER LOGGED IN");
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        const bodyFormData = new FormData();
        bodyFormData.append("accesskey", "90336");
        bodyFormData.append("add_to_cart", "1");
        bodyFormData.append("user_id", user_id);
        bodyFormData.append("product_id", item.id);
        bodyFormData.append("product_variant_id", item.variants[0].id);
        const finditem = allCartItems.find((data) => data.product_id == item.id);
  
        const newQty = (+finditem.amount || 0) + 1;
        bodyFormData.append("qty", newQty);
        setisLoading(true);
  
        axios
          .post(
            "https://grocery.intelliatech.in/api-firebase/cart.php",
            bodyFormData,
            config
          )
          .then((res) => {
            if (
              allCartItems.some((cartItem) => cartItem.product_id === item.id)
            ) {
              let newArr = allCartItems.map((data) =>
                data.product_id === item.id
                  ? { ...data, amount: +data.amount + 1 }
                  : data
              );
              console.log(newArr);
  
              setAllCartItems(newArr);
              setisLoading(false);
  
              return;
            }
            let newArr = [...allCartItems, { ...item, amount: 1 }];
            console.log(newArr);
            // setAllCartItems((cart) => [...cart, { ...item, amount: 1 }]);
            setAllCartItems(newArr);
          })
          .catch((error) => {
            console.log(error);
            setisLoading(false);
          });
      } else {
        let newArr = allCartItems.map((i) => {
          console.log(variant, i  );
          // console.log(i.id, item.variants[variant[item.id] || 0].id, "YELLOOOO");
          if ((i.product_variant_id??i.id) == item.variants[variant[item.id] || 0].id) {
            console.log("RUnning");
            return { ...i, amount: +i.amount + 1 };
          }
          return { ...i };
        });
        setAllCartItems(newArr);
      }
    } else if (change == "decrease") {
      if (user_id) {
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };

        const bodyFormData = new FormData();
        bodyFormData.append("accesskey", "90336");
        bodyFormData.append("add_to_cart", "1");
        bodyFormData.append("user_id", user_id);
        bodyFormData.append("product_id", item.id);

        console.log(item, variant, "bodyForm APPEMND");
        bodyFormData.append(
          "product_variant_id",
          item.variants[variant[item.variants.length > 1 ? item.id : 0 || 0]].id
        );

        const finditem = allCartItems.find(
          (data) => data.product_id == item.id
        );
        const newQty =
          +finditem.amount !== 0 ? +finditem.amount - 1 : finditem.amount;
        // console.log();
        bodyFormData.append("qty", newQty);
        setisLoading(true);

        axios
          .post(
            "https://grocery.intelliatech.in/api-firebase/cart.php",
            bodyFormData,
            config
          )
          .then(() => {
            console.log(allCartItems, "-1 CQ >><><><><><><><><><><");

            if (
              allCartItems.some((product) => {
                console.log(product, item);
                return product.amount === 1 && product.product_id === item.id;
              })
            ) {
              let newArr = allCartItems.filter(
                (pro) => pro.product_id !== item.id || pro.amount !== 1
              );

              console.log(
                newArr,
                "Cart Quant -1 LAST ITEM ><>>>>>>>><><><<><><><>"
              );

              setisLoading(false);

              setAllCartItems(newArr);
            } else if (
              allCartItems.some((cartItem) => cartItem.product_id === item.id)
            ) {
              let newArr = allCartItems.map((data) =>
                data.product_id === item.id && data.amount > 1
                  ? {
                      ...data,
                      amount: data.amount - 1,
                    }
                  : data
              );
              console.log(
                newArr,
                "Cart Quant MORE THAN 1 ><>>>><>><><><><>>>><><><<><><><>"
              );

              setAllCartItems(newArr);
              setisLoading(false);

              return;
            }
          })
          .catch((error) => {
            console.log(error);
            setisLoading(false);
          });
      } else {
        if (
          allCartItems.some((product) => {
            console.log(product, item);
            console.log(
              product.amount === 1,
              (product.product_variant_id ?? product.id) ===
                item.variants[variant[item.id] || 0].id
            );
            return (
              product.amount === 1 &&
              (product.product_variant_id ?? product.id) ===
                item.variants[variant[item.id] || 0].id
            );
          })
        ) {
          console.log("INSIDE 1");
          let newArr = allCartItems.filter((cartItem) => {
            // console.log(pro.id === item.variants[variant[item.id]|| 0].id && pro.amount !== 1, "INSIDE IF");
    
            // console.log(pro.id === item.variants[variant[item.id]|| 0].id , pro.amount !== 1, "CHECK");
    
            // return pro.id === item.variants[variant[item.id]|| 0].id || pro.amount !== 1
            console.log(
              (cartItem.product_variant_id ?? cartItem.id) ==
                item.variants[variant[item.id] || 0].id
            );
            if (
              (cartItem.product_variant_id ?? cartItem.id) ==
              item.variants[variant[item.id] || 0].id
            )
              return false;
            return true;
          });
    
          console.log(newArr, "Cart Quant -1 LAST ITEM ><>>>>>>>><><><<><><><>");
    
          setAllCartItems(newArr);
        } else if (
          allCartItems.some((cartItem) => {
            console.log(cartItem, item);
            console.log(
              cartItem.product_variant_id,
              item.variants[variant[item.id] || 0].id
            );
            // console.log(cartItem.id , item.variants[variant[item.id]|| 0].id);
            return (
              (cartItem.product_variant_id ?? cartItem.id) ===
              item.variants[variant[item.id] || 0].id
            );
          })
        ) {
          console.log();
          let newArr = allCartItems.map((cartItem) =>
            (cartItem.product_variant_id ?? cartItem.id) ===
              item.variants[variant[item.id] || 0].id && cartItem.amount > 1
              ? {
                  ...cartItem,
                  amount: cartItem.amount - 1,
                }
              : cartItem
          );
          console.log(
            newArr,
            "Cart Quant MORE THAN 1 ><>>>><>><><><><>>>><><><<><><><>"
          );
    
          setAllCartItems(newArr);
    
          return;
        }
      }
    }

    return
  };

  const quantityDecrease = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].id);
    const finditem = allCartItems.find((data) => data.product_id == item.id);
    const newQty =
      +finditem.amount !== 0 ? +finditem.amount - 1 : finditem.amount;
    // console.log();
    bodyFormData.append("qty", newQty);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then(() => {
        console.log(allCartItems, "-1 CQ >><><><><><><><><><><");

        if (
          allCartItems.some((product) => {
            console.log(product);
            return product.amount === 1;
          })
        ) {
          let newArr = allCartItems.filter(
            (pro) => pro.product_id !== item.id || pro.amount !== 1
          );
          console.log(
            newArr,
            "Cart Quant -1 LAST ITEM ><>>>>>>>><><><<><><><>"
          );
          setisLoading(false);

          setAllCartItems(newArr);
        } else if (
          allCartItems.some((cartItem) => cartItem.product_id === item.id)
        ) {
          let newArr = allCartItems.map((data) =>
            data.product_id === item.id && data.amount > 1
              ? {
                  ...data,
                  amount: data.amount - 1,
                }
              : data
          );
          console.log(newArr, "Cart Quant MORE THAN 1 ><>>>>>>>><><><<><><><>");

          setAllCartItems(newArr);
          setisLoading(false);

          return;
        }
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  const quantityIncrease = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].id);
    const finditem = allCartItems.find((data) => data.product_id == item.id);

    const newQty = (+finditem.amount || 0) + 1;
    bodyFormData.append("qty", newQty);
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
              ? { ...data, amount: +data.amount + 1 }
              : data
          );
          console.log(newArr);

          setAllCartItems(newArr);
          setisLoading(false);

          return;
        }
        let newArr = [...allCartItems, { ...item, amount: 1 }];
        console.log(newArr);
        // setAllCartItems((cart) => [...cart, { ...item, amount: 1 }]);
        setAllCartItems(newArr);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  const findItemNumber = () => {
    console.log(variant, item);
    let index = allCartItems.findIndex((i) => {
      console.log(i, i.product_variant_id,i.id,'i', item,'item', variant,  "FINDDDDD>>>>><");
      // console.log( +item.variants[variant[item.id] || 0].id);

      // return true
      return (i.product_variant_id ?? i.id) == +item.variants[variant?.[item.id] || 0].id;
    });
    console.log(index);
    console.log(allCartItems);
    console.log(allCartItems[index].amount);

    return allCartItems[index].amount;
  };

  return (
    <div className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px] w-full sm:h-[36px] flex justify-evenly " onClick={(e)=>e.stopPropagation()}>
      <button
        className="md:text-lg xs:text-sm sm:text-4xl"
        onClick={() => {
          console.log(user_id);
          changeQuantity('decrease')

          // user_id ? quantityDecrease() : quantityDecreaseUI();
        }}
      >
        -
      </button>

      {
        <p className="md:text-sm xs:text-sm sm:text-xl mt-1 bg-lime">
          {findItemNumber()}
        </p>
      }

      <button
        className="md:text-lg xs:text-sm sm:text-2xl"
        onClick={() => {
          console.log(user_id);
          changeQuantity('increase')
          // quantityIncreaseBoth();
          // user_id ? quantityIncrease() : quantityIncreaseUI();
        }}
      >
        +
      </button>
    </div>
  );
}

export default CartQuantity;
