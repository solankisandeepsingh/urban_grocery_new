import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";

export const Contact = () => {
  const [contact, setContact] = useState("");
  const { setisLoading } = useLoaderState();
  
  const handleContact = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let contactData = new FormData();
    contactData.append("accesskey", "90336");
    contactData.append("settings", "1");
    contactData.append("get_contact", "1");
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/settings.php",
        contactData,
        config
      )
      .then((res) => {
        console.log(res.data.contact);
        setContact(res?.data?.contact);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  useEffect(() => {
    handleContact();
  },[]);

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div>
      <div class="md:flex md:flex-row">
        <div class="xs:w-72 xs:py-20 xs:px-1 md:h-full md:w-1/4 md:px-12 md:mt-10">
          <Aside />
        </div>

        <div class="md:w-3/4 xs:w-full md:mt-[-30px] xs:mt-[-270px]">
          <div class="md:mt-28 md:text-center">
            <div class="">
              <p class="md:text-md mt-72 text-black font-bold">
                {stripHTML(contact)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
