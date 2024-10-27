"use server";

import { cookies } from "next/headers";
import axios from "axios";

const baseUrl = process.env.BASE_URL;
export async function authentication({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${baseUrl}/auth`, {
      email,
      password,
    });

    const { token, user } = response.data;
    const Cookies = cookies();

    Cookies.set("token", token);
    return user;
  } catch (error) {
    console.error("Error on authentication: ", error);
    throw error;
  }
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${baseUrl}/users`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error on registration: ", error);
    throw error;
  }
}
