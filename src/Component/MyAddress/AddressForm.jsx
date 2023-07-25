import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useLoaderState } from "../zustand/useLoaderState";

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
  const [otherField, setOtherField] = useState("");
  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setCityDropdown(selectedValue);
    console.log(selectedValue);
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setAreaDropdown(selectedValue);
  };

  const handleOtherText = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setOtherField(value);
  };

  const handleInputChange = (event) => {
    console.log(event, "<><><><><><><><><><><>");
    const { name, value } = event.target;
    // console.log(name, "><<><><></></>");
    setAddressData({ ...addressData, [name]: value });
  };
  console.log(addressData);
  const config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // setAddList([...addList, addressData]);

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
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
        data,
        config
      )
      .then((res) => {
        console.log(res, "hi");
        getAddress();
        setFormOpen(false);
        setisLoading(false);
        setOtherField("");
      })

      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    setAddressData({
      name: "",
      address: "",
      type: "",
      city: "",
      pincode: "",
    });
  };

  useEffect(() => {
    const cityData = new FormData();
    cityData.append("accesskey", "90336");
    axios
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
      console.log("initial");
      setIntialrender(false);
    } else {
      if (!cityDropdown) {
        return;
      }
      console.log("calling areas api");
      const areaData = new FormData();
      areaData.append("accesskey", "90336");
      areaData.append("city_id", `${cityDropdown}`);
      axios
        .post(
          "https://grocery.intelliatech.in/api-firebase/get-areas-by-city-id.php",
          areaData,
          config
        )
        .then((res) => setAreas(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [cityDropdown]);

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white rounded top-[5%] left-[5%]">
        <div className="flex justify-center items-center relative">
          <div className="container relative  opacity-70">
            <button
              className="absolute top-[5%] right-[5%]"
              onClick={() => setFormOpen(false)}
            >
              <AiOutlineCloseCircle className="text-red text-2xl hover:opacity-50" />
            </button>
            <div className="w-full p-8 md:px-12 mr-auto rounded-2xl shadow-2xl">
              <div className="flex justify-between">
                <h1 className="font-bold text-3xl text-gryColour">
                  Address :{" "}
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <div className="">
                    <input
                      className="w-full mt-2 p-2 rounded-lg border border-light_gray "
                      type="text"
                      placeholder=" Name*"
                      name="name"
                      value={addressData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      className="w-auto mt-2 p-2 rounded-lg  border border-light_gray"
                      placeholder="Pincode*"
                      type="number"
                      name="pincode"
                      value={addressData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <textarea
                      className="w-full p-2 h-auto rounded-lg border border-light_gray"
                      type="text"
                      placeholder="Address*"
                      name="address"
                      value={addressData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="my-5 flex ">
                  <div className="mr-2">
                    <select
                      value={cityDropdown}
                      onChange={handleDropdown1Change}
                      className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">City</option>
                      {cities.map((item) => (
                        <option key={item.id} value={item.id}>
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
                      className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Area</option>
                      {areas &&
                        areas.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex my-2 justify-between items-center text-center">
                  <div className=" flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Home"
                        checked={addressData.type === "Home"}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="ml-2 text-lightGrayBlinkit bg-colorGray border border-light_gray hover:border-GreenBlinkit cursor-pointer p-2 rounded-lg text-[13px]">Home</span>
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
                      <span className="ml-2 text-lightGrayBlinkit bg-colorGray border border-light_gray hover:border-GreenBlinkit cursor-pointer p-2 rounded-lg text-[13px]">Work</span>
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
                      <span className="ml-2 text-lightGrayBlinkit bg-colorGray border border-light_gray hover:border-GreenBlinkit cursor-pointer p-2 rounded-lg text-[13px]">Others</span>
                    </label>
                  </div>

                  <div className="">
                    <button className="uppercase text-[10px] text-white font-bold h-[30px] w-[90px] bg-lime rounded-lg">
                      Save Address
                    </button>
                  </div>
                </div>
                {addressData.type === "Other" && (
                  <div className="">
                    <input
                      onChange={handleOtherText}
                      name="type"
                      type="text"
                      className="block w-full py-2 px-3 border border-light_gray  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
