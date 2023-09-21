import axios from "axios";
import React, { useEffect, useState } from "react";

import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";
import { useApiToken } from "../zustand/useApiToken";

export const About = () => {
  const [about, setAbout] = useState("");
  const { setisLoading } = useLoaderState();

  const { apiToken } = useApiToken();
  const handleAbout = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
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
        setAbout(res?.data?.about);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  // useEffect(() => {
  //   handleAbout();
  // }, []);

  useEffect(() => {
    if (apiToken) handleAbout();
  }, [apiToken]);

  return (
    <>
      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%]  xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] mb-3 ">
          <div className="bg-white">
            <div
              dangerouslySetInnerHTML={{
                __html: about.replace(
                  "<h2>About Us</h2>",
                  '<h2 style="font-weight:500;">About Us</h2>'
                ),
              }}
            >
              {/* {JSON.parse(item.description)} */}
              {console.log(about, "about us")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
