import axios from "axios";
import { useApiToken } from "../Component/zustand/useApiToken";

const axiosInstance = axios.create({
  baseURL: "https://grocery.intelliatech.in/api-firebase",
});

const axiosRefresh = axios.create({
  baseURL: "https://grocery.intelliatech.in/api-firebase",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { apiToken } = useApiToken.getState();

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const resp = await axiosRefresh.get("/verify-token.php?generate_token", {
      params: {
        key: "generate_token",
      },
    });
    console.log(resp.data, "response check");
    return resp.data;
  } catch (e) {
    console.error("Error refreshing token:", e);
    throw e;
  }
};

axiosInstance.interceptors.response.use(
  async function (response) {
    if (response?.data?.error && response?.data?.message == "Invalid Hash") {
      try {
        const refreshedToken = await refreshToken();
        useApiToken.getState().setApiToken(refreshedToken);

        const newConfig = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: `Bearer ${refreshedToken}`,
          },
        };

        const newResponse = await axiosInstance(newConfig);

        return newResponse;
      } catch (e) {
        console.error("Error refreshing token:", e);
        return Promise.reject(e);
      } finally {
      }
    } else return response;
  },
  function (error) {
    console.error("Error in response interceptor:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
