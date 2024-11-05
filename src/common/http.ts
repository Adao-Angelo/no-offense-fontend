import axios from "axios";
import Cookies from "js-cookie";

// const BaseUrl =
//   process.env.BASE_URL || "https://no-offense-backend.onrender.com";

const BaseUrl = process.env.BASE_URL || "http://localhost:2000";

const accessToken = Cookies.get("token");

const http = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export { http };
