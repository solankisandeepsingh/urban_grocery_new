import axios from "axios";
import React from "react";
import { useCartStore } from "../zustand/useCartStore";
import { useUserStore } from "../zustand/useUserStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiToken } from "../zustand/useApiToken";
import { toast } from "react-toastify";

function CartQuantity({ item, variant }) {
  const { allCartItems, setAllCartItems } = useCartStore();
  const { setisLoading } = useLoaderState();
  const {
    userInfo: { user_id },
  } = useUserStore();
  const { apiToken } = useApiToken();

  const changeQuantity = (change) => {
    if (change == "increase") {
      if (user_id) {
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
        const finditem = allCartItems.find(
          (data) => data.product_id == item.id
        );

        const newQty = (+finditem.amount || 0) + 1;
        bodyFormData.append("qty", newQty);
        if (newQty > 10) {
          toast.error("Quantity limit has been exceeded", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
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

              setAllCartItems(newArr);
              toast.success("Item added to user cart successfully !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
              });
              setisLoading(false);
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
        let newArr = allCartItems.map((i) => {
          if (
            (i.product_variant_id ?? i.id) ==
            item.variants[variant[item.id] || 0].id
          ) {
            return { ...i, amount: +i.amount + 1 };
          }
          return { ...i };
        });
        toast.success("Item added to user cart successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          
        });
        setAllCartItems(newArr);
      }
    } else if (change == "decrease") {
      if (user_id) {
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

        const finditem = allCartItems.find(
          (data) => data.product_id == item.id
        );
        const newQty =
          +finditem.amount !== 0 ? +finditem.amount - 1 : finditem.amount;
        bodyFormData.append("qty", newQty);
        setisLoading(true);

        axios
          .post(
            "https://grocery.intelliatech.in/api-firebase/cart.php",
            bodyFormData,
            config
          )
          .then(() => {
            if (
              allCartItems.some((product) => {
                return product.amount === 1 && product.product_id === item.id;
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
      } else {
        if (
          allCartItems.some((product) => {
            return (
              product.amount === 1 &&
              (product.product_variant_id ?? product.id) ===
                item.variants[variant[item.id] || 0].id
            );
          })
        ) {
          let newArr = allCartItems.filter((cartItem) => {
            if (
              (cartItem.product_variant_id ?? cartItem.id) ==
              item.variants[variant[item.id] || 0].id
            )
              return false;
            return true;
          });

          setAllCartItems(newArr);
        } else if (
          allCartItems.some((cartItem) => {
            return (
              (cartItem.product_variant_id ?? cartItem.id) ===
              item.variants[variant[item.id] || 0].id
            );
          })
        ) {
          let newArr = allCartItems.map((cartItem) =>
            (cartItem.product_variant_id ?? cartItem.id) ===
              item.variants[variant[item.id] || 0].id && cartItem.amount > 1
              ? {
                  ...cartItem,
                  amount: cartItem.amount - 1,
                }
              : cartItem
          );

          setAllCartItems(newArr);

          return;
        }
      }
    }

    return;
  };



  const findItemNumber = () => {
    let index = allCartItems.findIndex((i) => {
      // return true
      return (
        (i.product_variant_id ?? i.id) ==
        +item.variants[variant?.[item.id] || 0].id
      );
    });

    return allCartItems[index].amount;
  };

  return (
    <>
      <div
        className="rounded-lg bg-lime text-white gap-1 hover:bg-blue-700 font-bold px-2 md:h-[28px] xs:h-[28px] w-full sm:h-[36px] flex justify-evenly "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="md:text-lg xs:text-sm sm:text-4xl "
          onClick={() => {
            changeQuantity("decrease");
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
            changeQuantity("increase");
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default CartQuantity;
