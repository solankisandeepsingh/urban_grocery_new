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
        setisLoading(false)
      });
  };

  useEffect(() => {
    handleFaq();
  }, []);
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
                {faqData}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
