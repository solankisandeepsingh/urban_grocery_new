import React, { useEffect, useRef, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import { useUserStore } from "../zustand/useUserStore";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useApiStore } from "../zustand/useApiStore";

export const MyProfile = () => {
  // const [editBtn, setEditBtn] = useState(false);
  const inputRef = useRef(null);
  const {
    userInfo: { user_id, name, email, password, profile },
    setUserInfo,
    userInfo,
  } = useUserStore();
  const [isValidImg, setisValidImg] = useState(false);
  const { jwt, setJwt } = useApiStore();


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
    // console.log(editBtn);
    // setEditBtn(true);
  };
  const handleImageUpload = (event) => {
    console.log("text Onchange");
    const file = event.target.files[0];
    if (file) {
      let config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      let formData = new FormData();

      formData.append("accesskey", "90336");
      formData.append("type", "upload_profile");
      formData.append("user_id", user_id);
      // formData.append("profile", `${updateUser.profile}`);
      formData.append("profile", file);

      axios
        .post(
          `https://grocery.intelliatech.in/api-firebase/user-registration.php`,
          formData,
          config
        )
        .then((res) => {
          console.log(res, "upload image");
          getUserData();
          toast.success("Profile successfully uploaded!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(file, "file");
  };

  const getUserData = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    let updateProfileData = new FormData();
    updateProfileData.append("accesskey", "90336");
    updateProfileData.append("get_user_data", "1");
    updateProfileData.append("user_id", user_id);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/get-user-data.php`,
        updateProfileData,
        config
      )
      .then((res) => {
        console.log(res, "res data will update user");
        // toast.success('Profile successfully uploaded!', {
        //   position: toast.POSITION.TOP_CENTER
        // });

        setUserInfo(res.data);
        // setUserInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
        // toast.error('Failed to upload profile image.', {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };

  const handleUpdateProfile = () => {
    // e.preventDefault();
    // setEditBtn((prev) => !prev);
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
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
        toast.success("Profile successfully uploaded!", {
          position: toast.POSITION.TOP_CENTER,
        });

        getUserData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to upload profile image.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    const img = new Image();
    img.src = profile;

    img.onload = () => {
      setisValidImg(true);
    };

    img.onerror = () => {
      setisValidImg(false);
    };
  }, [profile]);

  return (
    <div className="justify-center items-center text-center mt-24">
      <div>
        <p className="font-bold">My Profile</p>
      </div>
      <ToastContainer />
      <div className="w-[50%] m-auto my-10 border border-light_gray h-auto px-6 py-4 rounded-lg">
        <div className=" justify-between">
          <div className="flex justify-center items-center">
            {isValidImg ? (
              <div className="group relative">
                <a href="#!">
                  <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
                <AiFillEdit  onClick={() => inputRef.current.click()} className="absolute cursor-pointer text-[20px] text-white top-5 bg-black rounded-full  right-0.5  opacity-[50%] group-hover:opacity-[100%] transition-all " />
                <img
                  src={profile}
                  className="rounded-full object-cover  w-[100px] h-[100px] border-2 border-[#e8e8e8] shadow-lg"
                  alt=""
                 
                />
              </div>
            ) : (
              <>
                <FaUserCircle
                  className="xs:text-3xl text-lime md:text-[100px] mr-1 cursor-pointer"
                  onClick={() => inputRef.current.click()}
                />
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={inputRef}
            />
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
            <div className=" justify-between ">
              <div className="flex flex-col">
                <label htmlFor="" className="text-start">
                  Name :{" "}
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  value={updateUser.name}
                  // disabled={!editBtn}
                  className="block w-full py-2 px-3 border border-light_gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" justify-between py-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-start">
                  E-mail :{" "}
                </label>
                <input
                  name="email"
                  type="text"
                  onChange={handleInputChange}
                  value={updateUser.email}
                  // disabled={!editBtn}
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
            {/* <div className="flex justify-around  mt-5">
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
                <button className="w-24 bg-lightest_grey rounded-lg py-2"  onClick={(e) => {
                  e.preventDefault();
                  handleEditAPI();
                }}>
                  Save
                </button>
              )}
            </div> */}

            <div className="flex justify-around  mt-5">
              <button className="w-24 bg-lightest_grey rounded-lg py-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
