import React from "react";
import { useLoaderState } from "../zustand/useLoaderState";
import { useUserStore } from "../zustand/useUserStore";
import { useCartStore } from "../zustand/useCartStore";
import { useApiToken } from "../zustand/useApiToken";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

function CartQuantity({ item }) {
  const { allCartItems, setAllCartItems } = useCartStore();
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { apiToken } = useApiToken();

  const quantityDecrease = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
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
    setisLoading(true);

    axiosInstance
      .post(
        "/cart.php",
        bodyFormData,
        config
      )
      .then(() => {
        if (
          allCartItems.some((product) => {
            return product.amount === 1;
          })
        ) {
          let newArr = allCartItems.filter(
            (pro) => pro.product_id !== item.id || pro.amount !== 1
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
        Authorization: `Bearer ${apiToken}`,
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
    if (newQty > 10) {
      toast.error("Quantity limit has been exceeded", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setisLoading(true);

    axiosInstance
      .post(
        "/cart.php",
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

          setAllCartItems(newArr);
          setisLoading(false);

          return;
        }else{
          toast.success("Item added to user cart successfully !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
          });
        }
        let newArr = [...allCartItems, { ...item, amount: 1 }];
        toast.success("Item added to user cart successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
        setAllCartItems(newArr);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  const findItemNumber = () => {
    let index = allCartItems.findIndex((i) => +i.product_id === +item.id);
    return allCartItems[index].amount;
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
