"use client";

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Chip} from "@nextui-org/react";
import paths from "@/paths";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: "Anja",
      href: paths.anja.anja(),
    },
    {
      title: "Time Tracker",
      href: paths.timeTracker.timeTracker(),
    },
    {
      title: "Dienst Plan",
      href: paths.dienstPlan.dienstPlan(),
    },
    {
      title: "Work and Travel",
      href: paths.workAndTravel.workAndTravel(),
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
            <Link color="secondary" href={paths.anja.anja()}>
              Anja
            </Link>
          </Chip>
        </NavbarItem>
        <NavbarItem>
          <Chip>
            <Link color="secondary" href={paths.timeTracker.timeTracker()}>
              Time Tracker
            </Link>
          </Chip>
        </NavbarItem>
        <NavbarItem>
          <Chip>
            <Link color="secondary" href={paths.workAndTravel.workAndTravel()}>
              Work + Travel
            </Link>
          </Chip>
        </NavbarItem>
        <NavbarItem>
          <Chip>
            <Link color="secondary" href={paths.dienstPlan.dienstPlan()}>
              Dienst Plan
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
