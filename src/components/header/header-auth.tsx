"use client";

import {
  NavbarItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import SignInButton from "../auth/signInButton";
import SignOutButton from "../auth/signOutButton";
import ThemeSwitcher from "../theme/themeSwitcher";
import ThemeToggler from "../theme/themeToggler";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <div className="flex gap-8">
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent className="bg-foreground text-background">
            <div className="p-4">
              <div className="flex flex-col justify-center items-center gap-8">
                <ThemeSwitcher />
                <p>{session.data.user.email}</p>
                <p className="text-center">{session.data.user.name}</p>
                <SignOutButton />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <ThemeToggler />
      </div>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggler />
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
