import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../zustand/useUserStore";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import {  toast } from "react-toastify";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";
import { useApiToken } from "../zustand/useApiToken";
import axiosInstance from "../../api/axiosInstance";

export const MyProfile = ({ setProfileView }) => {
  const inputRef = useRef(null);
  const {
    userInfo: { user_id,  profile },
    setUserInfo,
    userInfo,
  } = useUserStore();
  const [isValidImg, setisValidImg] = useState(false);
  const { setisLoading } = useLoaderState();
  const profileRef = useRef(null);
  const { apiToken } = useApiToken();

  const [updateUser, setUpdateUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
    profile: userInfo.profile,
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setUpdateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickMyProfileOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileView(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickMyProfileOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickMyProfileOutside);
    };
  }, []);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      let config = {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      };
      let formData = new FormData();

      formData.append("accesskey", "90336");
      formData.append("type", "upload_profile");
      formData.append("user_id", user_id);
      formData.append("profile", file);
      setisLoading(true);

      axiosInstance
        .post(`/user-registration.php`, formData, config)
        .then((res) => {
          getUserData();
          toast.success("Profile successfully uploaded!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUserData = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let updateProfileData = new FormData();
    updateProfileData.append("accesskey", "90336");
    updateProfileData.append("get_user_data", "1");
    updateProfileData.append("user_id", user_id);
    setisLoading(true);

    axiosInstance
      .post(`/get-user-data.php`, updateProfileData, config)
      .then((res) => {
        setUserInfo(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProfile = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };
    let updateProfileData = new FormData();
    updateProfileData.append("accesskey", "90336");
    updateProfileData.append("type", "edit-profile");
    updateProfileData.append("id", user_id);
    updateProfileData.append("name", `${updateUser.name}`);
    updateProfileData.append("email", `${updateUser.email}`);

    updateProfileData.append("city_id", "1");
    updateProfileData.append("area_id", "1");
    updateProfileData.append("street", "bhuj");
    updateProfileData.append("pincode", "191104");
    updateProfileData.append("dob", "15-12-1990");
    updateProfileData.append("latitude", "44.968046");
    updateProfileData.append("longitude", "94.420307");

    const object = {};
    updateProfileData.forEach((value, key) => {
      object[key] = value;
      object.user_id = user_id;
    });

    axiosInstance
      .post(`/user-registration.php`, updateProfileData, config)
      .then((res) => {
        toast.success("Profile successfully uploaded!", {
          position: toast.POSITION.TOP_CENTER,
        });

        getUserData();
        setProfileView(false);
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

  const closeLoginModal = () => {
    setProfileView(false);
  };

  return (
    <div className="justify-center items-center text-center mt-24">
      <div className="fixed  z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
        <div className="bg-white rounded top-[5%] left-[5%]" ref={profileRef}>
          <div className="flex justify-center items-center relative">
            <div className="container relative opacity-100">
              <button
                className="absolute top-[5%] right-[5%]"
                onClick={closeLoginModal}
              >
                <AiOutlineCloseCircle className="text-red text-2xl hover:opacity-50" />
              </button>
              <div className="w-full p-8 md:px-12 mr-auto flex flex-col justify-center items-center text-center rounded-2xl shadow-2xl">
                <div>
                  {isValidImg ? (
                    <div className="group relative">
                      <a href="#!">
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                      </a>
                      <AiFillEdit
                        onClick={() => inputRef.current.click()}
                        className="absolute cursor-pointer text-[20px] text-white bottom-[8%] right-[5%] opacity-[50%] group-hover:opacity-[100%] bg-black rounded-full transition-all "
                      />
                      <img
                        src={profile}
                        className="rounded-full object-cover xs:w-[150px] xs:h-[150px] md:w-[100px] md:h-[100px] sm:w-[100px] sm:h-[100px] border-2 border-[#e8e8e8] shadow-lg"
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

                    <div className="flex justify-around  mt-5">
                      <button className="w-24 bg-lime text-white rounded-lg py-2">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
