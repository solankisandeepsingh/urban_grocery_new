import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_TOKEN } from "../Token/Token";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

export const Contact = () => {
  const [contact, setContact] = useState("");
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  const handleContact = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
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
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%]  xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] ">
          <div class="">
            <p class="md:text-md text-center items-center text-black font-bold">
              {stripHTML(contact)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
