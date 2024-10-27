import { ToggleTheme } from "./ui/toggleTheme";
import { Input } from "./ui/input";
import NewPostButton from "./newPostButton";
import Profile from "./Profile";

export default async function Header() {
  return (
    <header className="flex fixed w-[100%] bg-background z-50 border-b-[1px] items-center justify-between border-input px-4 sm:px-8 md:px-16">
      <div className="flex gap-4 p-2 items-center">
        <Profile></Profile>
      </div>

      <div className="flex gap-4">
        <Input type="text" placeholder="Users names" />
        <NewPostButton />
        <div>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
