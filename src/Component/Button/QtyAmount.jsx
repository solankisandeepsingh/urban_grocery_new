import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";

export const QtyAmount = ({ item, setAddItem, addItem }) => {
  const quantityDecrease = () => {
    
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    var bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");
    bodyFormData.append("product_id", +item.product_id);
    bodyFormData.append("product_variant_id", +item.id);
    bodyFormData.append("qty", "1");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>itmemmmmmmamiyt", item);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        config,
        bodyFormData
      )
      .then((res) => {
        console.log(res);
        if (addItem.some((cartItem) => cartItem.id === item.id)) {
          setAddItem((cart) =>
            cart.map((data) =>
              data.id === item.id && data.amount > 1
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
      .catch((err) => {
        console.log(err);
      });
  };

  const quantityIncrease = () => {
    alert("helloo");
    console.log("addItem>>>>>>>>>>>>>>>>>>>>>>>>>>>>", addItem);
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");
    bodyFormData.append("product_id", +item.product_id);
    bodyFormData.append("product_variant_id", +item.id);
    bodyFormData.append("qty", "1");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>itmemmmmmmamiyt", item);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        console.log(">>>>>>>>>>>>>>resonse", res);
        if (addItem.some((cartItem) => cartItem.id === item.id)) {
          setAddItem((cart) =>
            cart.map((data) =>
              data.id === item.id ? { ...data, amount: +data.amount + 1 } : data
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

  const findAddItem = () => {
    // console.log(">>>>>>>>>>>>item.id cartQuantity",addItem)
    let index = addItem.findIndex((i) => +i.id === +item.id);
    return addItem[index].amount;
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
