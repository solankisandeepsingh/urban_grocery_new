import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../../Token/Token";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { AddressForm } from "../../MyAddress/AddressForm";

function Form({ back, setFormdata, formData }) {
  const [addList, setAddlist] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
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

      // event.preventDefault();
      // setFormArr([...formArr,formData])
      // console.log(formArr);
      // console.log(formData)
      // let config = {
      //   headers : {
      //     Authorization : `Bearer ${API_TOKEN}`
      //   }
      // }
      // var bodyFormData = new FormData();
      // bodyFormData.append("accesskey","90336")
      // bodyFormData.append("add_address","1")
      // bodyFormData.append("user_id","Home0")
      // bodyFormData.append("name",formData.name)
      // bodyFormData.append("mobile",formData.phone)
      // bodyFormData.append("address",formData.address)
      // bodyFormData.append("landmark","Bhuj-Mirzapar Highway")
      // bodyFormData.append("area_id","1")
      // bodyFormData.append("city_id","2")
      // bodyFormData.append("pincode",formData.pin)
      // bodyFormData.append("state","Gujarat")
      // bodyFormData.append("country","India")

      // axios.post("https://grocery.intelliatech.com/api-firebase/user-addresses.php",
      // config,
      // bodyFormData
      // ).then((res)=>{
      //   console.log(res)
      //   if(res.status === 200){
      //     alert("Succesfully Call")
      //     if (formData !== "") {
      //       back();
      //     }
      //   }
      // }).catch((err)=>{
      //   console.log(err)
      // })
    }
  };
  return (
    <>
      {!formOpen && (
        <>
          <form>
            {addList.map((item) => {
              return (
                <label>
                  <div className="border flex border-light_gray  px-3 py-3 mt-2 gap-1">
                  <input
                    type="radio"
                    name="options"
                    value={item.id}
                    checked={selectedOption === item.id}
                    onChange={handleOptionChange}
                  />

                  <div className="flex gap-2">
                    <div className="w-[5%]">
                      {item.type === "Home" ? (
                        <FaHome className="inline mr-3" />
                      ) : (
                        <HiOfficeBuilding className="inline mr-3" />
                      )}
                    </div>
                    <div className="w-[85%] flec flex-col">
                      <div className="font-medium ">{item.type === "Home" ? "Home" : "Work"}</div>
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

      {formOpen && (
        // <form
        //   className="w-full mt-5 xs:px-9  2xs:w-full 2xs:px-9 bg-white"
        //   onSubmit={submitHandler}
        // >
        //   <div className="md:flex mb-6 bg-white">
        //     <div className="md:w-1/3 bg-white">
        //       <label
        //         className="bg-white block text-gray-500 md:text-right  sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
        //         for="inline-full-name"
        //       >
        //         Name:
        //       </label>
        //     </div>
        //     <div className="md:w-7/12 bg-white">
        //       <input
        //         className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //         id="name"
        //         type="text"
        //         name="name"
        //         placeholder="Enter-name"
        //         onChange={formHandler}
        //         value={formData.name}
        //         required
        //       />
        //     </div>
        //   </div>

        //   <div className="md:flex mb-6 bg-white">
        //     <div className="md:w-1/3 bg-white">
        //       <label
        //         className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
        //         for="inline-full-name"
        //       >
        //         Address:
        //       </label>
        //     </div>
        //     <div className="md:w-7/12 bg-white">
        //       <input
        //         className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //         id="address"
        //         type="text"
        //         name="address"
        //         placeholder="Enter-address"
        //         onChange={formHandler}
        //         value={formData.address}
        //         required
        //       />
        //     </div>
        //   </div>

        //   <div className="md:flex mb-6 bg-white">
        //     <div className="md:w-1/3 bg-white">
        //       <label
        //         className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
        //         for="inline-full-name"
        //       >
        //         Phone:
        //       </label>
        //     </div>
        //     <div className="md:w-7/12 bg-white">
        //       <input
        //         className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //         id="phone"
        //         type="text"
        //         name="phone"
        //         placeholder="Enter-phone"
        //         onChange={formHandler}
        //         value={formData.phone}
        //         required
        //       />
        //     </div>
        //   </div>

        //   <div className="md:flex mb-6 bg-white">
        //     <div className="md:w-1/3 bg-white">
        //       <label
        //         className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
        //         for="inline-city"
        //       >
        //         City:
        //       </label>
        //     </div>
        //     <div className="md:w-7/12 bg-white ">
        //       <input
        //         className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //         id="city"
        //         type="text"
        //         name="city"
        //         placeholder="Enter-city"
        //         onChange={formHandler}
        //         value={formData.city}
        //         required
        //       />
        //     </div>
        //   </div>

        //   <div className="bg-white md:flex  mb-6">
        //     <div className="bg-white md:w-1/3">
        //       <label
        //         className="bg-white block text-gray-500 md:text-right sm:text-2xl md:text-lg md:mb-0 pr-4 font-semibold"
        //         for="inline-full-name"
        //       >
        //         Pin-Code:
        //       </label>
        //     </div>
        //     <div className="bg-white md:w-7/12">
        //       <input
        //         className="bg-white mt-1 shadow appearance-none border rounded w-full sm:py-3 md:py-2 xs:py-2 sm:text-2xl md:text-sm xs:text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //         id="pin"
        //         type="pin-num"
        //         placeholder="pin-code"
        //         onChange={formHandler}
        //         name="pin"
        //         value={formData.pin}
        //         required
        //       />
        //     </div>
        //   </div>

        //   <div className="text-center bg-white">
        //     <button className="bg-lime text-white hover:opacity-90 sm:w-full md:w-36 sm:text-2xl md:text-lg px-4 py-1.5 rounded-lg ">
        //       Next
        //     </button>
        //   </div>
        // </form>
        <AddressForm setFormOpen={setFormOpen} getAddress={getAddress}/>
      )}
    </>
  );
}

export default Form;
