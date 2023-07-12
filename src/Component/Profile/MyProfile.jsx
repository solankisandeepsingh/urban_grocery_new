import React, { useState } from "react";
import { API_TOKEN } from "../Token/Token";
import { useUserStore } from "../zustand/useUserStore";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

export const MyProfile = () => {
  const [editBtn, setEditBtn] = useState(false);
  const {
    userInfo: { user_id, name, email, password },
    setUserInfo,
    userInfo,
  } = useUserStore();
  // const [nameUpdate, setNameUpdate] = useState(userInfo.name)

  const [updateUser, setUpdateUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
    // password: userInfo.password,
    profile: userInfo.profile,
  });

  //   console.log(updateUser, " value={updateUser.email}");
  console.log(updateUser);
  console.log(userInfo, "userInfo");

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    setUpdateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditAPI = () => {
    console.log(true);
    console.log(editBtn);
    setEditBtn(true);
  };
  const handleUpdateImg = () => {
    let config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };
      let uploadImg = new FormData();
      uploadImg.append("accesskey","90336")
      uploadImg.append("type","upload_profile")
      uploadImg.append("user_id",user_id)
      uploadImg.append("profile", `${updateUser.profile}`);

      axios.post(`https://grocery.intelliatech.in/api-firebase/user-registration.php`,
      uploadImg,
      config
      ).then((res)=>{
        console.log(res,"upload image")
      }).catch((err)=>{
        console.log(err);
      })
  };
  const handleUpdateProfile = () => {
    // e.preventDefault();
    setEditBtn((prev) => !prev);
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let updateProfileData = new FormData();
    updateProfileData.append("accesskey", "90336");
    updateProfileData.append("type", "edit-profile");
    updateProfileData.append("id", user_id);
    updateProfileData.append("name", `${updateUser.name}`);
    updateProfileData.append("email", `${updateUser.email}`);
    // updateProfileData.append("profile", `${updateUser.profile}`);
    // updateProfileData.append("password", `${updateUser.password}`);
    updateProfileData.append("city_id", "1");
    updateProfileData.append("area_id", "1");
    updateProfileData.append("street", "bhuj");
    updateProfileData.append("pincode", "191104");
    updateProfileData.append("dob", "15-12-1990");
    updateProfileData.append("latitude", "44.968046");
    updateProfileData.append("longitude", "94.420307");

    console.log(updateProfileData, "upd");

    const object = {};
    updateProfileData.forEach((value, key) => {
      object[key] = value;
      object.user_id = user_id;
    });

    console.log(object);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/user-registration.php`,
        updateProfileData,
        config
      )
      .then((res) => {
        console.log(res, "res data will update user");
        setUserInfo(object);
        // setUserInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="justify-center items-center text-center mt-24">
      <div>
        <p>Login & Security</p>
      </div>

      <div className="w-[50%] m-auto my-10 border border-light_gray h-auto px-6 py-4 rounded-lg">
      <div className=" justify-between border-b border-b-light_gray py-2">
              <div className="flex justify-center items-center " onClick={handleUpdateImg}>
              <FaUserCircle className=" xs:text-3xl text-lime  md:text-[100px] mr-1 cursor-pointer"  />
                {/* <label htmlFor="" className="text-start">
                  Upload Profile:{" "}
                </label>
                <input
                  name="profile"
                  type="file"
                  onChange={handleInputChange}
            
                  
                  className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                /> */}
              </div>
            </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
          action=""
        >
          <div>
            <div className=" justify-between border-b border-b-light_gray py-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-start">
                  Name :{" "}
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  value={updateUser.name}
                  disabled={!editBtn}
                  className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" justify-between border-b border-b-light_gray py-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-start">
                  E-mail :{" "}
                </label>
                <input
                  name="email"
                  type="text"
                  onChange={handleInputChange}
                  value={updateUser.email}
                  disabled={!editBtn}
                  className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
         
            {/* <div className=" justify-between border-b border-b-light_gray py-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-start">
                  Upload Profile:{" "}
                </label>
                <input
                  name="profile"
                  type="file"
                  onChange={handleInputChange}
                  value={updateUser?.password}
                  disabled={!editBtn}
                  className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div> */}
            <div className="flex justify-around  mt-5">
              {!editBtn ? (
                <button
                  className="w-24 bg-lime rounded-lg py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditAPI();
                  }}
                >
                  Edit
                </button>
              ) : (
                <button className="w-24 bg-lightest_grey rounded-lg py-2">
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
