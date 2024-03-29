import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useLoaderState } from "../zustand/useLoaderState";
import { toast } from "react-toastify";
import { useApiToken } from "../zustand/useApiToken";
import axiosInstance from "../../api/axiosInstance";

export const AddressForm = ({ getAddress, setFormOpen, user_id }) => {
  const [addressData, setAddressData] = useState({
    name: "",
    address: "",
    type: "",
    city: "",
    pincode: "",
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [cityDropdown, setCityDropdown] = useState("");
  const [areaDropdown, setAreaDropdown] = useState("");
  const [initialRender, setIntialrender] = useState(true);
  const { setisLoading } = useLoaderState();
  const { apiToken } = useApiToken();
  const [otherField, setOtherField] = useState("");
  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setCityDropdown(selectedValue);
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setAreaDropdown(selectedValue);
  };

  const handleOtherText = (event) => {
    const { name, value } = event.target;
    setOtherField(value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData({ ...addressData, [name]: value });
  };
  const config = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !addressData?.name ||
      !addressData?.pincode ||
      !addressData?.address ||
      !addressData?.type ||
      !areaDropdown ||
      !cityDropdown
    ) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const data = new FormData();
      data.append("accesskey", "90336");
      data.append("add_address", "1");
      data.append("user_id", user_id);
      data.append("type", `${otherField ? otherField : addressData.type}`);
      data.append("name", `${addressData.name}`);
      data.append("mobile", "9131582414");
      data.append("address", `${addressData.address}`);
      data.append("landmark", "Bhuj-Mirzapar Highway");
      data.append("area_id", `${areaDropdown}`);
      data.append("city_id", `${cityDropdown}`);
      data.append("pincode", `${addressData.pincode}`);
      data.append("state", "Gujrat");
      data.append("country", "India");
      setisLoading(true);
      axiosInstance
        .post(
          "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
          data,
          config
        )
        .then((res) => {
          toast.success("Address added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
          });
          getAddress();
          setFormOpen(false);
          setisLoading(false);
          setOtherField("");
        })

        .catch((err) => {
          console.log(err);
          setisLoading(false);
        });
    }
  };

  useEffect(() => {
    const cityData = new FormData();
    cityData.append("accesskey", "90336");
    axiosInstance
      .post(
        "https://grocery.intelliatech.in/api-firebase/get-cities.php",
        cityData,
        config
      )
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (initialRender) {
      setIntialrender(false);
    } else {
      if (!cityDropdown) {
        return;
      }
      const areaData = new FormData();
      areaData.append("accesskey", "90336");
      areaData.append("city_id", `${cityDropdown}`);
      axiosInstance
        .post(
          "https://grocery.intelliatech.in/api-firebase/get-areas-by-city-id.php",
          areaData,
          config
        )
        .then((res) => setAreas(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [cityDropdown]);
  const regex = /^[1-9]\d{2}\s?\d{3}$/;

  return (
    <div className="fixed z-50 top-0  left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-[#f2f2f2] min-w-[600px] rounded top-[5%] left-[5%]">
        <div className="flex justify-center items-center relative">
          <div className="container relative">
            <button
              className="absolute top-[5%] right-[5%]"
              onClick={() => setFormOpen(false)}
            >
              <AiOutlineCloseCircle className="text-red text-2xl opacity-60 hover:opacity-100" />
            </button>
            <div className="w-full p-8 md:px-12 mr-auto rounded-2xl shadow-2xl">
              <div className="flex justify-between">
                <h1 className="font-bold p-2 text-xl text-gryColour">
                  Add Address{" "}
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 xs:gap-0 md:gap-5 md:grid-cols-2 ">
                  <div className="">
                    <input
                      className="w-full h-[30px] mt-2 p-2 rounded-lg text-xs border border-light_gray "
                      type="text"
                      placeholder=" Name*"
                      name="name"
                      value={addressData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <input
                      className={`w-full h-[30px] mt-2 p-2 rounded-lg text-xs border ${
                        addressData.pincode.length !== 6
                          ? "border-red-500"
                          : "border-light_gray"
                      }`}
                      placeholder="Pincode*"
                      type="text"
                      name="pincode"
                      value={addressData.pincode}
                      onChange={handleInputChange}
                    />
                    {/* {addressData.pincode.length !== 6 && (
                      <p className="text-red text-xs mt-1 ml-1">
                        Pincode must be exactly 6 digits
                      </p>
                    )} */}

                    {/* {!regex.test(addressData.pincode) && (
  <p className="text-red text-xs mt-1 ml-1">
    {addressData.pincode.length <= 6
      ? ""
      : "Pincode cannot exceed 6 digits"}
  </p>
)} */}

                    {!regex.test(addressData.pincode) && (
                      <>
                        <p className="text-red text-xs mt-1 ml-1">
                          {!addressData?.pincode
                            ? ""
                            : addressData.pincode.length <= 6
                            ? ""
                            : addressData.pincode.length > 6
                            ? "Pincode cannot exceed 6 digits"
                            : "Pincode is invalid"}
                        </p>
                        {addressData.pincode.length > 6 &&
                          toast.error("Pincode is invalid")}
                      </>
                    )}
                  </div>
                </div>

                <div className="my-2">
                  <textarea
                    className="w-full p-2 h-auto rounded-lg text-xs border border-light_gray"
                    type="text"
                    placeholder="Address*"
                    name="address"
                    value={addressData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="my-2 flex items-start justify-evenly text-center">
                  <div className="flex justify-start">
                    <div className="mr-2">
                      <select
                        value={cityDropdown}
                        onChange={handleDropdown1Change}
                        className="block w-full py-1 px-2 min-w-max border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                      >
                        <option className="" value="" disabled selected>
                          Select your city
                        </option>
                        {cities.map((item) => (
                          <option className="" key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={areaDropdown}
                        onChange={handleDropdown2Change}
                        disabled={!cityDropdown}
                        className="block w-full py-1 px-2 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                      >
                        <option className="" value="" disabled selected>
                          Select your Area
                        </option>{" "}
                        {areas &&
                          areas.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex mb-2 justify-between items-center text-center">
                    <div className=" flex flex-col justify-center items-center gap-2">
                      <div className="flex gap-2">
                        <label>
                          <input
                            type="radio"
                            name="type"
                            value="Home"
                            checked={addressData.type === "Home"}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <span
                            className={`text-lightGrayBlinkit ${
                              addressData.type === "Home"
                                ? "bg-lime text-[white]"
                                : "hover:bg-[#f2f2f2]"
                            } bg-colorGray border border-light_gray hover:border-GreenBlinkit  cursor-pointer py-1 px-2 rounded-lg text-xs`}
                          >
                            Home
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="type"
                            value="Work"
                            checked={addressData.type === "Work"}
                            onChange={handleInputChange}
                            className="hidden p-3 bg-lime"
                          />
                          <span
                            className={`text-lightGrayBlinkit ${
                              addressData.type === "Work"
                                ? "bg-lime text-[white]"
                                : "hover:bg-[#f2f2f2]"
                            } bg-colorGray border border-light_gray hover:border-GreenBlinkit  cursor-pointer py-1 px-2 rounded-lg text-xs`}
                          >
                            Work
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            name="type"
                            value="Other"
                            checked={addressData.type === "Other"}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <span
                            className={`text-lightGrayBlinkit ${
                              addressData.type === "Other"
                                ? "bg-lime text-[white]"
                                : "hover:bg-[#f2f2f2]"
                            } bg-colorGray border border-light_gray hover:border-GreenBlinkit  cursor-pointer py-1 px-2 rounded-lg text-xs`}
                          >
                            Other
                          </span>
                        </label>
                      </div>
                      {addressData.type === "Other" && (
                        <div className="text-xs">
                          <input
                            onChange={handleOtherText}
                            name="type"
                            type="text"
                            placeholder="Enter you Address Type"
                            className="block h-[25px]  w-full py-2 text-xs px-2 border border-light_gray  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center text-center">
                  <button className="uppercase text-[10px] text-white font-bold h-[36px] w-[50%] bg-lime rounded-lg">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
