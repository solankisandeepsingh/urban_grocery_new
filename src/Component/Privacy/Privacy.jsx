import React, { useEffect, useState } from "react";
import {} from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";
import { useApiToken } from "../zustand/useApiToken";

export const Privacy = () => {
  const [privacy, setPrivacy] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();
  const {apiToken} = useApiToken()

  const handlePrivacy = () => {
    let config = {
      headers: {
        // Authorization: `Bearer ${jwt}`,
        Authorization: `Bearer ${apiToken}`,
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


  return (
    <>
      {/* <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        <div class="w-[60%]"> */}

      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%]  xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] ">
        <div dangerouslySetInnerHTML={{__html: privacy}}>

                  {/* {JSON.parse(item.description)} */}
                  </div>
        </div>
      </div>
    </>
  );
};
