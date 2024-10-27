"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ChevronDown, LogOut } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import { getInitials } from "initials-extractor";

export default function Profile() {
  const [userAuth, setUserAuth] = useState<UserType>();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth");
  };

  useEffect(() => {
    const User = Cookies.get("userAuthenticated");
    if (!User) {
      router.push("/auth");
    } else {
      const userParse: UserType = JSON.parse(User);
      setUserAuth(userParse);
    }
  }, [userAuth]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src="https://github.com/Antonio-Gabriel.png"
            alt="@antonio"
          />
          <AvatarFallback>
            {getInitials(userAuth?.name || "NOT FUND")}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <Card className="relative overflow-hidden rounded-lg">
          <CardHeader
            className="h-[150px] w-full bg-cover bg-center blur-md"
            style={{
              backgroundImage: `url('https://github.com/Antonio-Gabriel.png')`,
            }}
          ></CardHeader>

          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2">
            <Avatar className="w-24 h-24 border-4 border-white rounded-full">
              <AvatarImage
                src="https://github.com/Antonio-Gabriel.png"
                alt="@shadcn"
              />
              <AvatarFallback>
                {getInitials(userAuth?.name || "NOT FUND")}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardContent className="mt-[80px] text-center">
            <div className="my-[10px]">
              <p className="font-semibold">Adão Angelo João</p>
              <p className="text-gray-500 text-[14px]">@adaobegginer</p>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-[100%] flex justify-start gap-2 text-left"
            >
              <LogOut /> <p>Log out</p>
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
