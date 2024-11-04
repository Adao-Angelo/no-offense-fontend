import { ToggleTheme } from "./ui/toggleTheme";
import Profile from "./Profile";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="flex p-2 fixed w-[100%] bg-background z-50 border-b-[1px] items-center justify-between border-input px-4 sm:px-8 md:px-16">
      <Profile></Profile>

      <div className="flex gap-4">
        <div className="block">
          <Link
            className="flex gap-1 items-center justify-center"
            href="/newPost"
          >
            <CirclePlus />
            <p className="hidden sm:block">New Publication</p>{" "}
          </Link>
        </div>
        <div>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
