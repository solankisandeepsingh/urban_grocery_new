import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useApiToken } from "../zustand/useApiToken";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axiosInstance from "../../api/axiosInstance";

export const ReturnOrder = ({ setReturnModal, orderId }) => {
  let returnRef = useRef(null);

  const { apiToken } = useApiToken();

  const handleClickReturnModalOutside = (event) => {
    if (returnRef.current && !returnRef.current.contains(event.target)) {
      setReturnModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickReturnModalOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickReturnModalOutside);
    };
  }, []);

  const handleReturnOrder = (e) => {
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
    cancelData.append("status", "delivered ");


    axiosInstance
      .post(
        "/order-process.php",
        cancelData,
        config
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setReturnModal(false);
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

  return (
    <div>
      <div
        className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
        onClick={() => setReturnModal(false)}
      >
        <div
          className="bg-[#f5f5f5] rounded top-[5%] left-[5%] md:w-[500px] xs:w-[340px] sm:w-[500px]"
          ref={returnRef}
        >
          <div className="flex justify-center items-center relative">
            <div className="container relative flex ">
              <div className="w-full p-8 md:px-12 mr-auto rounded-2xl ">
                <button
                  className="absolute top-[5%] right-[5%]"
                  onClick={() => setReturnModal(false)}
                >
                  <AiOutlineCloseCircle className="text-red relative text-xl animate-hbeat hover:scale-125 transition-all cursor-pointer " />
                </button>
                <div className="flex justify-center text-center items-center">
                  <p className="font-bold">
                    Are you sure you want to Return Order?
                  </p>
                </div>

                <div></div>

                <div className="mb-8 mt-6 flex  justify-center items-center gap-2">
                  <button
                    type="submit"
                    className="inline-block  bg-lightgray hover:bg-light_gray px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleReturnOrder}
                  >
                    Yes
                  </button>
                  <button
                    type="submit"
                    className="inline-block  bg-red hover:bg-candy px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => setReturnModal(false)}
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
