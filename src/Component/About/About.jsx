import React, { useEffect, useState } from "react";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiToken } from "../zustand/useApiToken";
import axiosInstance from "../../api/axiosInstance";

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

    axiosInstance
      .post("/settings.php", conditonData, config)
      .then((res) => {
        setAbout(res?.data?.about);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (apiToken) handleAbout();
  }, [apiToken]);

  return (
    <>
      <div className="flex flex-col mt-24 md:ml-10  xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[30%] sm:w-[30%] xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="border-r border-r-light_gray  mt-[-40px]  w-4 h-[110vh]"></div>

        <div className="md:w-[100%] sm:w-[60%] xs:w-[85%] overflow-y-scroll h-[90vh] ml-4">
          <div className="bg-white">
            <div
              dangerouslySetInnerHTML={{
                __html: about.replace(
                  "<h2>About Us</h2>",
                  '<h2 style="font-weight:500;">About Us</h2>'
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
