import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { ToggleTheme } from "./ui/toggleTheme";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ChevronDown, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NewPostButton from "./newPostButton";

export default async function Header() {
  return (
    <header className="flex fixed w-[100%] bg-background z-50 border-b-[1px] items-center justify-between border-input px-16 ">
      <div className="flex gap-4 p-2 items-center">
        <Popover>
          <Avatar>
            <AvatarImage
              src="https://github.com/Antonio-Gabriel.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <PopoverTrigger asChild>
            <Button
              className="flex items-center gap-1 text-[14px]"
              variant="outline"
            >
              <p>@adaobegginer</p>
              <ChevronDown />
            </Button>
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
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <CardContent className="mt-[80px] text-center">
                <div className="my-[10px]">
                  <p className="font-semibold">Adão Angelo João</p>
                  <p className="text-gray-500 text-[14px]">@adaobegginer</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-[100%] flex justify-start gap-2 text-left">
                  <LogOut /> <p>Log out</p>
                </Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-4">
        <Input type="text" placeholder="Users names" />
        <NewPostButton></NewPostButton>
        <div>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
