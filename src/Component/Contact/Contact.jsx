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
      <div className="flex flex-row justify-evenly mt-28">
        <div className="w-[35%] h-full ">
          <Aside />
        </div>

        <div class="w-[60%]">
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
