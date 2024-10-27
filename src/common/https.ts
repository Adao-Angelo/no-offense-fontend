import axios from "axios";

const BaseUrl = process.env.BASE_URL;
const APIKey = process.env.API_KEY;

const http = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: `Bearer ${APIKey}`,
    Prefer: "return=minimal",
  },
});

export { http };
