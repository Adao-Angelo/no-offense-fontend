"use server";

import { cookies } from "next/headers";
import axios from "axios";

const BaseUrl = process.env.BASE_URL;
const cookie = cookies();
const APIKey = cookie.get("token");

const http = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: `Bearer ${APIKey}`,
    Prefer: "return=minimal",
  },
});

export { http };
