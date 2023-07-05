import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";

export const About = () => {
  const [about, setAbout] = useState("");
  const { setisLoading } = useLoaderState();
  const handleAbout = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let conditonData = new FormData();
    conditonData.append("accesskey", "90336");
    conditonData.append("settings", "1");
    conditonData.append("get_about_us", "1");
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        conditonData,
        config
      )
      .then((res) => {
        console.log(res);
        setAbout(res?.data?.about);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  useEffect(() => {
    handleAbout();
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
              <p class="text-lg font-bold text-black">{stripHTML(about)}</p>
            
          </div>
        </div>
      </div>
    </>
  );
};
