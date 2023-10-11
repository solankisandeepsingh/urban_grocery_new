import React, { useState, useEffect } from "react";

import { FaHome, FaPlus } from "react-icons/fa";
import { HiOfficeBuilding, HiLocationMarker } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { AddressForm } from "./AddressForm";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useUserStore } from "../zustand/useUserStore";
import {  toast } from "react-toastify";
import { useApiToken } from "../zustand/useApiToken";

export const Address = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { setisLoading } = useLoaderState();
  const { addList, setAddList } = useUserStore();
  const { apiToken } = useApiToken();

  const {
    userInfo: { user_id },
  } = useUserStore();

  const config = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const getAddress = () => {
    const data = new FormData();
    data.append("accesskey", "90336");
    data.append("get_addresses", "1");
    data.append("user_id", user_id);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
        data,
        config
      )
      .then((res) => {
        setAddList(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };



  useEffect(() => {
    if (apiToken) getAddress();
  }, [apiToken]);

  const handleDelete = (id) => {
    const deleteData = new FormData();
    deleteData.append("accesskey", "90336");
    deleteData.append("delete_address", "1");
    deleteData.append("id", `${id}`);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
        deleteData,
        config
      )
      .then((res) => {
        toast("Address deleted successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose:500,
          className: 'foo-bar'
        });
        getAddress();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%] xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] w-[90%] ">
          <div className="">
            <div
              className="flex flex-row border border-light_gray py-3 px-3 md:w-[800px] sm:w-[450px] xs:w-full "
              onClick={() => setFormOpen(!formOpen)}
            >
              <span className="cursor-pointer rounded-full border-2 border-lime text-lime py-1 px-1 text-xs">
                <FaPlus />
              </span>
              <button className="ml-6 mt-[-4px] text-lime">
                {" "}
                Add New Address
              </button>
            </div>

            <div>
              {addList &&
                addList.map((item) => {
                  return (
                    <>
                      <div className="border border-light_gray md:w-[800px] sm:w-[450px] xs:w-full px-3 py-3 mt-2">
                        <div className="flex gap-2">
                          <div className="w-[5%] ">
                            {item.type === "Home" ? (
                              <FaHome className="inline mr-3" />
                            ) : item.type === "Work" ? (
                              <HiOfficeBuilding className="inline mr-3" />
                            ) : (
                              <HiLocationMarker className="inline mr-3" />
                            )}
                          </div>

                          <div className="w-[85%] flex flex-col">
                            {/* <div>{item.type === "Home" ? "Home" : "work"}</div> */}
                            <div>{item.type}</div>
                            <div className="pt-[10px]">
                              <span className="gap-2">{item.name} -</span>
                              <span className="">{item.address}, </span>
                              <span className="">{item.area_name}, </span>
                              <span className="">{item.city_name}, </span>
                              {/* <span className="">{item.landmark}, </span> */}
                              <span className="">{item.pincode}, </span>
                              <span className="">{item.country} </span>
                            </div>
                          </div>
                          <div className="w-[10%] flex gap-1 items-center">
                            {/* <button
                              onClick={() => handleEdit(item.id)}
                              className="text-[21px] font-normal"
                            >
                              <AiOutlineEdit />
                            </button> */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red text-[21px] font-normal"
                            >
                              <AiOutlineDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        {formOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
            <div className="bg-white rounded p-8">
              {/* <h2 className="text-lg font-bold mb-4">Modal Title</h2> */}
              {/* <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt condimentum lectus, ut commodo metus cursus vitae.
          </p> */}
              <AddressForm
                setFormOpen={setFormOpen}
                getAddress={getAddress}
                user_id={user_id}
              />
              {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Close Modal
          </button> */}

              {/* <div className="w-[10%] flex gap-4 items-center">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="text-[21px] font-normal"
                            >
                              <AiOutlineEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red text-[21px] font-normal"
                            >
                              <AiOutlineDelete />
                            </button>
                          </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
