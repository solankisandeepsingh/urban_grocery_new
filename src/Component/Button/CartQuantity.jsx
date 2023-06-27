import axios from "axios";
import React from "react";
import { API_TOKEN } from "../Token/Token";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";

function CartQuantity({ item }) {
  const { allCartItems, setAllCartItems } = useCartStore();
  const {userInfo :{user_id} } = useUserStore();
  

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
    bodyFormData.append("qty", newQty);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then(() => {
        if (allCartItems.some((product) => product.amount === 1)){


          let newArr = allCartItems.filter(
            (pro) => pro.product_id !== item.id || pro.amount !== 1
          )
          console.log(newArr, "Cart Quant - 1 ><>>>>>>>><><><<><><><>")
            setAllCartItems(newArr)
        }


        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          let newArr =allCartItems.map((data) =>
              data.product_id === item.id && data.amount > 1
                ? {
                    ...data,
                    amount: data.amount - 1,
                  }
                : data
            )
          setAllCartItems(newArr);

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
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", item.id);
    bodyFormData.append("product_variant_id", item.variants[0].id);
    const finditem = allCartItems.find((data) => data.product_id == item.id);

    const newQty = (+finditem.amount || 0) + 1;
    bodyFormData.append("qty", newQty);

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
        console.log(newArr)

          setAllCartItems(newArr)

          return;
        }
        let newArr = [...allCartItems, {...item , amount : 1}]
        console.log(newArr)
        // setAllCartItems((cart) => [...cart, { ...item, amount: 1 }]);
        setAllCartItems(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findItemNumber = () => {
    let index = allCartItems.findIndex((i) => +i.product_id === +item.id);
    console.log(allCartItems[index].amount);
    return allCartItems[index].amount;
  };

  return (
    <div className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px]  md:w-14 xs:w-14 sm:w-[70px] sm:h-[36px] flex justify-between ">
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
