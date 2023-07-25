import React, { useEffect, useState } from "react";
import {  } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const Privacy = () => {
  const [privacy, setPrivacy] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();


  const handlePrivacy = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    let privacyData = new FormData();
    privacyData.append("accesskey", "90336");
    privacyData.append("settings", "1");
    privacyData.append("get_privacy", "1");
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        privacyData,
        config
      )
      .then((res) => {
        console.log(res);
        setPrivacy(res?.data?.privacy);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    handlePrivacy();
  }, []);

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        <div class="w-[60%]">
          
            <div class="bg-white">
              <p class="text-md font-bold">{stripHTML(privacy)}</p>
            </div>
          
        </div>
      </div>
    </>
  );
};
