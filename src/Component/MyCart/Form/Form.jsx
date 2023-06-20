import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../../Token/Token";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { AddressForm } from "../../MyAddress/AddressForm";

function Form({setShowModal}) {
  const [addList, setAddlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const getAddress = () => {
    const data = new FormData();
    data.append("accesskey", "90336");
    data.append("get_addresses", "1");
    data.append("user_id", "14");

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

  const handleOpenForm = () => {
    setFormOpen(true);
  };
  const handleProceedToPay = () => {
    navigate("/payment");
    setShowModal(false)
  };

  return (
    <>
      {!formOpen && (
        <>
          <form>
            {addList.map((item) => {
              return (
                <label>
                  <div className="border flex border-light_gray px-3 py-3 mt-2 gap-1 m-4 rounded-md">
                    <div className="">
                      <input
                        type="radio"
                        name="options"
                        value={item.id}
                        checked={selectedOption === item.id}
                        onChange={handleOptionChange}
                      />
                    </div>

                    <div className="flex gap-2 ">
                      <div className="w-[5%]">
                        {item.type === "Home" ? (
                          <FaHome className="inline ml-3 mb-1" />
                        ) : (
                          <HiOfficeBuilding className="inline ml-3 mb-1" />
                        )}
                      </div>
                      <div className="w-[85%] flex flex-col ml-4">
                        <div className="font-medium ">
                          {item.type === "Home" ? "Home" : "Work"}
                        </div>
                        <div className="pt-[10px] text-[#8d9191] ">
                          <span className="gap-2 ">{item.name} -</span>
                          <span className="">{item.address}, </span>
                          <span className="">{item.area_name}, </span>
                          <span className="">{item.city_name}, </span>
                          <span className="">{item.pincode}, </span>
                          <span className="">{item.country} </span>
                        </div>
                      </div>
                      <div className="w-[10%] flex gap-4 items-center"></div>
                    </div>
                  </div>
                </label>
              );
            })}
          </form>

          <div className="mt-2">
            {selectedOption ? (
              <NavLink to={`/payment`}>
                <button
                  onClick={handleProceedToPay}
                  className="bg-lime text-white hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                >
                  Proceed to Pay
                </button>
              </NavLink>
            ) : (
              <button
                onClick={() => handleOpenForm()}
                className="bg-lime text-white hover:opacity-90 sm:w-full md:w-[90%] mx-4 sm:text-2xl md:text-lg px-4 py-1.5  rounded-lg "
              >
                Add new address
              </button>
            )}
          </div>
        </>
      )}

      {formOpen && (
        <AddressForm setFormOpen={setFormOpen} getAddress={getAddress} />
      )}
    </>
  );
}

export default Form;
