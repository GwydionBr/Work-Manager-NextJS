"use client";

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Chip} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import paths from "@/paths";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: "Time Tracker",
      href: paths.timeTracker.timeTracker(),
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">Gwydion</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Chip>
            <Link color="secondary" href={paths.timeTracker.timeTracker()}>
              Time Tracker
            </Link>
          </Chip>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
