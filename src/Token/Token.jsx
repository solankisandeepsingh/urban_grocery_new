import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useApiToken } from "../Component/zustand/useApiToken";

 const Token = () => {
  const { accessTokenApi, apiToken } = useApiToken();
  console.log(apiToken,"apiToken??!!")

  useEffect(() => {
    axios
      .get(
        "https://grocery.intelliatech.in/api-firebase/verify-token.php?generate_token",
        {
          params: {
            key: "generate_token",
          },
        }
      )
      .then((res) => {
        accessTokenApi(res?.data);
      })
      .catch((error) => {
        console.log(error, "Api Error");
      });
  }, []);

  return <></>;
}
export default Token
