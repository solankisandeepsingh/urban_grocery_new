import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useApiToken } from "../zustand/useApiToken";

export const CancelOrder = ({ setCancelModal, orderId }) => {
  let cancelRef = useRef(null);

  const { apiToken } = useApiToken();
  const closeModalBox = () => {
    setCancelModal(false);
  };

  const handleClickCancelModalOutside = (event) => {
    if (cancelRef.current && !cancelRef.current.contains(event.target)) {
      setCancelModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickCancelModalOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickCancelModalOutside);
    };
  }, []);
  const handleOrderCancel = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    const cancelData = new FormData();
    cancelData.append("accesskey", "90336");
    cancelData.append("update_order_status", "1");
    cancelData.append("id", orderId);
    cancelData.append("status", "cancelled");

    console.log(orderId, "order id");

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/order-process.php",
        cancelData,
        config
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
          });
          setCancelModal(false);
        } else {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNoCancel = () => {
    setCancelModal(false);
  };

  return (
    <div>
      <div className="fixed  z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
        <div
          className="bg-[#f5f5f5] rounded top-[5%] left-[5%] md:w-[500px] xs:w-[340px] sm:w-[500px]"
          ref={cancelRef}
        >
          <div className="flex justify-center items-center relative">
            <div className="container relative flex ">
              <div className="w-full p-8 md:px-12 mr-auto rounded-2xl ">
                <button className="absolute top-[5%] right-[5%]"></button>
                <div className="flex justify-center text-center items-center">
                  <p className="font-bold">
                    Are you sure you want to Cancel Order?
                  </p>
                </div>

                <div></div>

                <div className="mb-8 mt-6 flex  justify-center items-center gap-2">
                  <button
                    type="submit"
                    className="inline-block  bg-red px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleOrderCancel}
                  >
                    Yes
                  </button>
                  <button
                    type="submit"
                    className="inline-block  bg-lime px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleNoCancel}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
