"use server";

import Cookies from "js-cookie";
import axios from "axios";

const BaseUrl = process.env.BASE_URL;
const APIKey = Cookies.get("token");

const http = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: `Bearer ${APIKey}`,
    Prefer: "return=minimal",
  },
});

export { http };
