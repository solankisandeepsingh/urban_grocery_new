import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";

function CartQuantity({ item, setAddItem, addItem }) {
  console.log(addItem);

  const quantityDecrease = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");
    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].id);
    const finditem = addItem.find((data) => data.product_id == item.id);
    const newQty =
      +finditem.amount !== 0 ? +finditem.amount - 1 : finditem.amount;
    bodyFormData.append("qty", newQty);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then(() => {
        if (addItem.some((product) => product.amount === 1))
          setAddItem(
            addItem.filter(
              (pro) => pro.product_id !== item.id || pro.amount !== 1
            )
          );

        if (addItem.some((cartItem) => cartItem.product_id === item.id)) {
          setAddItem((cart) =>
            cart.map((data) =>
              data.product_id === item.id && data.amount > 1
                ? {
                    ...data,
                    amount: data.amount - 1,
                  }
                : data
            )
          );

          return;
        }
      })
      .catch((error) => {
        console.log(error);
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
    bodyFormData.append("user_id", "14");

    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].id);

    const finditem = addItem.find((data) => data.product_id == item.id);
    // console.log(finditem, "[FIND ITEM]")

    // console.log(oldQty)
    const newQty = (+finditem.amount || 0) + 1;
    bodyFormData.append("qty", newQty);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        // console.log(">>>>>>>>>>>>>>resonse", res);
        if (addItem.some((cartItem) => cartItem.product_id === item.id)) {
          setAddItem((cart) =>
            cart.map((data) =>
              data.product_id === item.id
                ? { ...data, amount: +data.amount + 1 }
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

  const findItemNumber = () => {
    let index = addItem.findIndex((i) => +i.product_id === +item.id);
    console.log(addItem[index].amount);
    return addItem[index].amount;
  };

  return (
    <>
      <div className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px] w-[100%] sm:h-[36px] flex justify-around  p-0 items-center ">
        <button
          className="xs:text-sm sm:text-4xl md:text-xl"
          onClick={() => quantityDecrease()}
        >
          -
        </button>

        {
          <p className="md:text-xl xs:text-sm sm:text-xl bg-lime">
            {findItemNumber()}
          </p>
        }

        <button
          className="md:text-xl xs:text-sm sm:text-2xl"
          onClick={() => quantityIncrease()}
        >
          +
        </button>
      </div>
    </>
  );
}

export default CartQuantity;
