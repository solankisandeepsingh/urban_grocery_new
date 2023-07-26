import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";
import { useCartStore } from "../zustand/useCartStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useUserStore } from "../zustand/useUserStore";

export const QtyAmount = ({ item }) => {
  const { allCartItems, setAllCartItems } = useCartStore();
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
  } = useUserStore();

  const quantityDecrease = () => {
    if (user_id) {
      console.log("IN IF");
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };

      const bodyFormData = new FormData();
      bodyFormData.append("accesskey", "90336");
      bodyFormData.append("add_to_cart", "1");
      bodyFormData.append("user_id", `${user_id}`);
      bodyFormData.append("product_id", item.product_id);
      bodyFormData.append("product_variant_id", item.product_variant_id);

      const finditem = allCartItems.find((data) => {
        console.log(data);
        return data.product_id === item.product_id;
      });
      const newQty = +finditem.amount !== 0 ? +finditem.amount - 1 : 0;
      bodyFormData.append("qty", newQty);
      setisLoading(true);

      axios
        .post(
          "https://grocery.intelliatech.in/api-firebase/cart.php",
          bodyFormData,
          config
        )
        .then(() => {
          setisLoading(false);
          if (
            allCartItems.some(
              (cartItem) => cartItem.product_id === item.product_id
            )
          ) {
            if (newQty > 0) {
              let newArr = allCartItems.map((data) =>
                data.product_id === item.product_id
                  ? { ...data, amount: newQty }
                  : data
              );
              setAllCartItems(newArr);
            } else {
              let newArr = allCartItems.filter(
                (data) => data.product_id !== item.product_id
              );
              setAllCartItems(newArr);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setisLoading(false);
        });
    } else {

      console.log(item);
      if (item.amount == 1) {
        console.log("Item 1");
        setAllCartItems(
          allCartItems.filter((cartItem) => {
            if (cartItem.id === item.id) {
              return false;
            }
            else{
              return true
            }
          })
          );
        }
        else{
          // console.log("Item > 1");
          // console.log(allCartItems.map((cartItem) => {
          //     if (item.id === cartItem.id) {
          //       return { ...cartItem, amount: cartItem.amount - 1 };
          //     } else return cartItem
          //   }));

          setAllCartItems(allCartItems.map((cartItem) => {
            if (item.id === cartItem.id) {
              return { ...cartItem, amount: cartItem.amount - 1 };
            } else return cartItem
          }))
        }
    }
  };

  const quantityIncrease = () => {
    if (user_id) {
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };

      const bodyFormData = new FormData();
      bodyFormData.append("accesskey", "90336");
      bodyFormData.append("add_to_cart", "1");
      bodyFormData.append("user_id", `${user_id}`);
      // bodyFormData.append("product_id", item.id);
      bodyFormData.append("product_id", item.product_id);
      bodyFormData.append("product_variant_id", item.product_variant_id);
      const finditem = allCartItems.find((data) => {
        console.log(data);
        return data.product_id == item.product_id;
      });
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
          console.log(">>>>>>>>>>>>>>resonse", res);
          setisLoading(false);
          if (allCartItems.some((cartItem) => cartItem.id === item.id)) {
            let newArr = allCartItems.map((data) =>
              data.id === item.id ? { ...data, amount: +data.amount + 1 } : data
            );
            setAllCartItems(newArr);

            return;
          }
          let newArr = [...allCartItems, { ...item, amount: 1 }];

          setAllCartItems(newArr);
        })
        .catch((error) => {
          console.log(error);
          setisLoading(false);
        });
    } else {
      console.log(item);
      setAllCartItems(
        allCartItems.map((cartItem) => {
          if (item.id === cartItem.id) {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
        })
      );
    }
  };

  const findAddItem = () => {
    let index = allCartItems.findIndex((i) => +i.id === +item.id);
    return allCartItems[index].amount;
  };

  return (
    <div>
      <div className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px]  md:w-14 xs:w-14 sm:w-[70px] sm:h-[36px] flex justify-between ">
        <button
          className="md:text-lg xs:text-sm sm:text-4xl"
          onClick={() => quantityDecrease()}
        >
          -
        </button>

        {
          <p className="md:text-sm xs:text-sm sm:text-xl mt-1 bg-lime">
            {findAddItem()}
          </p>
        }

        <button
          className="md:text-lg xs:text-sm sm:text-2xl"
          onClick={() => quantityIncrease()}
        >
          +
        </button>
      </div>
    </div>
  );
};
