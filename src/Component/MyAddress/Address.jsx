import React, { useState, useEffect } from "react";
import DropdownMenu from "../AccountDropdown/DropdownMenu";
import { Form, NavLink } from "react-router-dom";
import {
  FaBell,
  FaHome,
  FaMapMarked,
  FaPlus,
  FaRegAddressBook,
  FaWallet,
} from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { AddressForm } from "./AddressForm";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";

export const Address = ({ isOpen, setIsOpen, user_id }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [addList, setAddlist] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const getAddress = () => {
    const data = new FormData();
    data.append("accesskey", "90336");
    data.append("get_addresses", "1");
    data.append("user_id", user_id);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
        data,
        config
      )
      .then((res) => setAddlist(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAddress();
  }, []);

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
        console.log("delete response:", res);
        getAddress();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {};

  return (
    <>
      <div className="flex xs:w-20 sm:mr-3 md:w-24 h-[30px] rounded-lg md:px-2 xs:mt-0.5 bg-white">
        <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="md:flex md:flex-row">
        <div className="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:py-36 md:mt-10">
          <ul className="font-medium xs:invisible md:visible md:fixed">
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/address"}>
                <a
                  to="/address"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="text-darkgray text-lg" />
                  <span className="ml-3 text-light_gray xs:text-xs font-light">
                    My Address
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg ">
              <NavLink to={"/myorder"}>
                <a
                  to="/myorder"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressBook className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3 text-lightgray xs:text-xs font-thin">
                    My Order
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/wallet"}>
                <a
                  to="/wallet"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaWallet className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    My Wallet
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/"}>
                <a
                  to="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBell className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    Logout
                  </span>
                </a>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="md:w-3/4 xs:w-full md:mt-[-30px] xs:mt-[-270px]">
          <div className="mt-40">
            <div
              className="flex flex-row border border-light_gray py-3 px-3 w-[800px]"
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
                      <div className="border border-light_gray w-[800px] px-3 py-3 mt-2">
                        <div className="flex ">
                          <div className="w-[5%]">
                            {item.type === "Home" ? (
                              <FaHome className="inline mr-3" />
                            ) : (
                              <HiOfficeBuilding className="inline mr-3" />
                            )}
                          </div>
                          <div className="w-[85%] flex flex-col">
                            <div>{item.type === "Home" ? "Home" : "work"}</div>
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
                          <div className="w-[10%] flex gap-4 items-center">
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};
