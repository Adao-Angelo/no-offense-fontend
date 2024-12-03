"use server";

import { UserType } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

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

    const {
      token,
      user,
    }: {
      token: string;
      user: {
        name: string;
        email: string;
        password: string;
        avatar?: string;
      };
    } = response.data;
    const Cookies = cookies();

    Cookies.set("userAuthenticated", JSON.stringify(user));
    Cookies.set("token", token);

    return user;
  } catch (error) {
    console.error("Error on authentication: ", error);
    throw error;
  }
}

export async function registerUser({ name, email, password }: UserType) {
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
