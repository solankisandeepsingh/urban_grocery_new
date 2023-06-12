import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";

export const AddressForm = ({
  addList,
  setAddList,
  getAddress,
  setFormOpen,
}) => {
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
  // const [pressed, setPressed] = useState(false);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
    setAddressData({ ...addressData, [name]: value });
    // setAddList("new");
    // console.log(addList)
  };

  const config = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cityDropdown);
    // setAddList([...addList, addressData]);

    const data = new FormData();
    data.append("accesskey", "90336");
    data.append("add_address", "1");
    data.append("user_id", "14");
    data.append("type", `${addressData.type}`);
    data.append("name", `${addressData.name}`);
    data.append("mobile", "9131582414");
    data.append("address", `${addressData.address}`);
    data.append("landmark", "Bhuj-Mirzapar Highway");
    data.append("area_id", `${areaDropdown}`);
    data.append("city_id", `${cityDropdown}`);
    data.append("pincode", `${addressData.pincode}`);
    data.append("state", "Gujrat");
    data.append("country", "India");
    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/user-addresses.php",
        data,
        config
      )
      .then((res) => {
        console.log(res, "hi");
        getAddress();
        setFormOpen(false)
      })


      .catch((err) => console.log(err));
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
        console.log("Not initial render, not calling api");
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
        <div className="bg-white rounded p-8">
        
        
    <div className="flex justify-center items-center relative">
      <div className="container my-4 px-4 lg:px-20 opacity-70">
        <div className="w-full p-8 my-4 md:px-12  lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <div className="flex justify-between">
            <h1 className="font-bold uppercase text-3xl">Address : </h1>
            <button onClick={() => setFormOpen(false)}>x</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=" Name*"
                name="name"
                value={addressData.name}
                onChange={handleInputChange}
              />
              <textarea
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Address*"
                type="text"
                name="address"
                value={addressData.address}
                onChange={handleInputChange}
              />

              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Pincode*"
                type="number"
                name="pincode"
                value={addressData.pincode}
                onChange={handleInputChange}
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="type"
                type="text"
                name="type"
                value={addressData.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="mr-6 flex flex-wrap">
              <div className="my-1">
               
                <select value={cityDropdown} onChange={handleDropdown1Change}>
                  <option value="">City</option>
                  {cities.map((item) => {
                    return (
                      <>
                        <option value={item.id}>{item.name}</option>
                      </>
                    );
                  })}
                </select>

                <select
                  value={areaDropdown}
                  onChange={handleDropdown2Change}
                  disabled={!cityDropdown}
                >
                  <option value="">Area</option>
                  {areas.map((item) => {
                    return (
                      <>
                        <option value={item.id}>{item.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-lime text-gray-100 p-3 rounded-lg w-full 
                  focus:outline-none focus:shadow-outline"
              >
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
