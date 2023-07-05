import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";

function CartQuantity({ item }) {
  const { allCartItems, setAllCartItems } = useCartStore();
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
  } = useUserStore();

  const quantityDecrease = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
        Authorization: `Bearer ${API_TOKEN}`,
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
    let index = allCartItems.findIndex((i) => +i.product_id === +item.id);
    console.log(allCartItems[index].amount);
    return allCartItems[index].amount;
  };

  return (
    <div className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px] w-full sm:h-[36px] flex justify-between " onClick={(e)=>e.stopPropagation()}>
      <button
        className="md:text-lg xs:text-sm sm:text-4xl"
        onClick={() => quantityDecrease()}
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
        onClick={() => quantityIncrease()}
      >
        +
      </button>
    </div>
  );
}

export default CartQuantity;
