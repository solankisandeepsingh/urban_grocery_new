import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../../Token/Token";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";

function Form({ back, setFormdata, formData }) {
  const [addList, setAddlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [openForm, setFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const formHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormdata({ ...formData, [name]: value });
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
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formData !== "") {
      back();
    }
  };
  return (
    <>
      {!openForm && (
        <>
          <form>
            {addList.map((item) => {
              return (
                <label>
                  <input
                    type="radio"
                    name="options"
                    value={item.id}
                    checked={selectedOption === item.id}
                    onChange={handleOptionChange}
                  />
                  <div className="flex ">
                    <div className="w-[5%]">
                      {item.type === "Home" ? (
                        <FaHome className="inline mr-3" />
                      ) : (
                        <HiOfficeBuilding className="inline mr-3" />
                      )}
                    </div>
                    <div className="w-[85%] flec flex-col">
                      <div>{item.type === "Home" ? "Home" : "work"}</div>
                      <div className="pt-[10px]">
                        <span className="gap-2">{item.name} -</span>
                        <span className="">{item.address}, </span>
                        <span className="">{item.area_name}, </span>
                        <span className="">{item.city_name}, </span>
                        <span className="">{item.pincode}, </span>
                        <span className="">{item.country} </span>
                      </div>
                    </div>
                    <div className="w-[10%] flex gap-4 items-center"></div>
                  </div>
                </label>
              );
            })}
          </form>

          <div className="">
            {selectedOption ? (
              <NavLink to={`/payment`}>
                <button
                  onClick={handleProceedToPay}
                  className="bg-lime text-white hover:opacity-90 sm:w-full md:w-full sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg"
                >
                  Proceed to Pay
                </button>
              </NavLink>
            ) : (
              <button
                onClick={() => handleOpenForm()}
                className="bg-lime text-white hover:opacity-90 sm:w-full md:w-full sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg "
              >
                Add new address
              </button>
            )}
          </div>
        </>
      )}

      {openForm && (
        <form
          className="w-full mt-5 xs:px-9  2xs:w-full 2xs:px-9 bg-white"
          onSubmit={submitHandler}
        >
          <div className="md:flex mb-6 bg-white">
            <div className="md:w-1/3 bg-white">
              <label
                className="bg-white block text-gray-500 md:text-right  sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
                for="inline-full-name"
              >
                Name:
              </label>
            </div>
            <div className="md:w-7/12 bg-white">
              <input
                className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Enter-name"
                onChange={formHandler}
                value={formData.name}
                required
              />
            </div>
          </div>

          <div className="md:flex mb-6 bg-white">
            <div className="md:w-1/3 bg-white">
              <label
                className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
                for="inline-full-name"
              >
                Address:
              </label>
            </div>
            <div className="md:w-7/12 bg-white">
              <input
                className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                name="address"
                placeholder="Enter-address"
                onChange={formHandler}
                value={formData.address}
                required
              />
            </div>
          </div>

          <div className="md:flex mb-6 bg-white">
            <div className="md:w-1/3 bg-white">
              <label
                className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
                for="inline-full-name"
              >
                Phone:
              </label>
            </div>
            <div className="md:w-7/12 bg-white">
              <input
                className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter-phone"
                onChange={formHandler}
                value={formData.phone}
                required
              />
            </div>
          </div>

          <div className="md:flex mb-6 bg-white">
            <div className="md:w-1/3 bg-white">
              <label
                className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
                for="inline-city"
              >
                City:
              </label>
            </div>
            <div className="md:w-7/12 bg-white ">
              <input
                className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                name="city"
                placeholder="Enter-city"
                onChange={formHandler}
                value={formData.city}
                required
              />
            </div>
          </div>

          <div className="bg-white md:flex  mb-6">
            <div className="bg-white md:w-1/3">
              <label
                className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
                for="inline-full-name"
              >
                Pin-Code:
              </label>
            </div>
            <div className="bg-white md:w-7/12">
              <input
                className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pin"
                type="pin-num"
                placeholder="pin-code"
                onChange={formHandler}
                name="pin"
                value={formData.pin}
                required
              />
            </div>
          </div>

          <div className="text-center bg-white">
            <button className="bg-lime text-white hover:opacity-90 sm:w-full md:w-36 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg ">
              Next
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
