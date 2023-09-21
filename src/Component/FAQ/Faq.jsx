import React, { useEffect, useState } from "react";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiToken } from "../zustand/useApiToken";

export const Faq = () => {
  const [faqData, setFaqData] = useState("");
  const { setisLoading } = useLoaderState();
  const { apiToken } = useApiToken();

  const handleFaq = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
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
        setFaqData(res?.data?.message);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (apiToken) handleFaq();
  }, [apiToken]);
  return (
    <>
      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%]  xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] ">
          <div className="bg-white">
            <p className="md:text-md  text-center justify-center items-center">
              {faqData}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
