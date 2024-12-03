import axios from "axios";
import Cookies from "js-cookie";

const http = () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:2000";

  const accessToken = Cookies.get("token");
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { http };
