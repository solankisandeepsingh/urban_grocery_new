import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";

export const Faq = () => {
  const [faqData, setFaqData] = useState("");
  const { setisLoading } = useLoaderState();
  const handleFaq = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
      <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        <div class="w-[60%]">
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
