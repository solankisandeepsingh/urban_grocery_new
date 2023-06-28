import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";

export const Privacy = () => {
  const [privacy, setPrivacy] = useState("");

  const handlePrivacy = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    let privacyData = new FormData();
    privacyData.append("accesskey", "90336");
    privacyData.append("settings", "1");
    privacyData.append("get_privacy", "1");

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        privacyData,
        config
      )
      .then((res) => {
        console.log(res);
        setPrivacy(res.data.privacy);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handlePrivacy();
  }, []);

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      <div class="md:flex md:flex-row">
        <div class="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:py-36 md:mt-10">
          <Aside />
        </div>

        <div class="md:w-3/4 xs:w-full md:mt-[-30px] xs:mt-[-270px]">
          <div class="md:mt-28 md:text-center">
            <div class="bg-white overflow-y-scroll">
              <p class="md:text-md">{stripHTML(privacy)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
