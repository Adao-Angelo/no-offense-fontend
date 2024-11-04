"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import { UserAvatar } from "./socialMediaCard";
import Link from "next/link";

export default function Profile() {
  const [userAuth, setUserAuth] = useState<UserType>();
  const router = useRouter();

  useEffect(() => {
    const User = Cookies.get("userAuthenticated");
    if (!User) {
      router.push("/auth");
    } else {
      const userParse: UserType = JSON.parse(User);
      setUserAuth(userParse);
    }
  }, []);

  const user = {
    name: userAuth?.name || "Anonymous",
    email: userAuth?.email || "",
    avatar: userAuth?.avatar || "",
  };

  return (
    <div>
      <Link href="/profile" className="flex items-center gap-2">
        <UserAvatar user={user} />
        <div>
          <h2 className="text-[14px] font-bold">{userAuth?.name}</h2>
          <p className="text-[10px]">{userAuth?.email}</p>
        </div>
      </Link>
    </div>
  );
}
