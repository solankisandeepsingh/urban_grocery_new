import axios from "axios";
import React, { useEffect, useState } from "react";
import { Aside } from "../Aside/Aside";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiToken } from "../zustand/useApiToken";

export const Contact = () => {
  const [contact, setContact] = useState("");
  const { setisLoading } = useLoaderState();
  const { apiToken } = useApiToken();

  const handleContact = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
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
        setContact(res?.data?.contact);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
 
  useEffect(() => {
    if (apiToken) handleContact();
  }, [apiToken]);

  return (
    <>
      <div className="flex flex-col mt-24 xs:justify-center xs:items-center md:items-start sm:items-start md:flex-row md:justify-evenly sm:justify-evenly sm:flex sm:flex-row ">
        <div className="xs:w-[85%] md:w-[35%] sm:w-[30%]  xs:hidden md:block sm:block h-full">
          <Aside />
        </div>

        <div className="md:w-[60%] sm:w-[60%] xs:w-[85%] mb-3">
          <div class="">
            <div dangerouslySetInnerHTML={{ __html: contact }}></div>
          </div>
        </div>
      </div>
    </>
  );
};
