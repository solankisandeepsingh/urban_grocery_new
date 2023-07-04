import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";

export const Coditions = () => {
  const [conditons, setConditons] = useState("");
  const { setisLoading } = useLoaderState();

  const handleConditons = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
        setisLoading(false)
      });
  };
  useEffect(() => {
    handleConditons();
  }, []);

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div>
      <div class="md:flex md:flex-row">
        <div class="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12  md:mt-10">
          <Aside />
        </div>

        <div class="md:w-3/4 xs:w-full md:mt-[-30px] xs:mt-[-270px]">
          <div class="md:mt-28 ">
            <div class="bg-white">
              <p class="md:text-md mt-72 text-center justify-center items-center">
                {stripHTML(conditons)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
