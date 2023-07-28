import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const Coditions = () => {
  const [conditons, setConditons] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  const handleConditons = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    let conditonData = new FormData();
    conditonData.append("accesskey", "90336");
    conditonData.append("settings", "1");
    conditonData.append("get_terms", "1");
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        conditonData,
        config
      )
      .then((res) => {
        console.log(res?.data?.terms);
        setConditons(res?.data?.terms);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  useEffect(() => {
    handleConditons();
  }, []);

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      {/* <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        <div class="w-[60%]"> */}

      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%] h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] ">
          <div class="bg-white">
            <p class="md:text-md text-center  justify-center items-center">
              {stripHTML(conditons)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
