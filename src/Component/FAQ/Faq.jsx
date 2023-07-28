import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const Faq = () => {
  const [faqData, setFaqData] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  const handleFaq = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    let FaqData = new FormData();
    FaqData.append("accesskey", "90336");
    FaqData.append("get_faqs", "1");
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/get-faqs.php`,
        FaqData,
        config
      )
      .then((res) => {
        console.log(res);
        setFaqData(res?.data?.message);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    handleFaq();
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
          <div class="bg-white">
            <p class="md:text-md  text-center justify-center items-center">
              {faqData}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
