// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useApiToken } from '../zustand/useApiToken';
// import axiosInstance from '../../api/axiosInstance';

// export const AccessToken = () => {
//     const {apiToken,accessTokenApi} = useApiToken();
//     console.log(apiToken,"apiToken??!!")
  
//     useEffect(() => {
//       axiosInstance
//         .get(
//           "https://grocery.intelliatech.in/api-firebase/verify-token.php?generate_token",
//           {
//             params: {
//               key: "generate_token",
//             },
//           }
//         )
//         .then((res) => {
//           accessTokenApi(res?.data);
//         })
//         .catch((error) => {
//           console.log(error, "Api Error");
//         });
//     }, []);
  
//     return <></>;
//   }

