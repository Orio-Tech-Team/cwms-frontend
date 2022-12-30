"use client";
import React from "react";
//
import { Button } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
//
type Props = {
  sidebarHandler: () => void;
};

const Navbar = ({ sidebarHandler }: Props) => {
  //

  //
  return (
    <>
      <nav className="bg-[#fefeff] absolute top-0 left-0 w-[100%] h-[70px] shadow-lg z-10 flex items-center px-5">
        <Button
          onClick={sidebarHandler}
          className="flex items-center justify-center aspect-square hover:bg-transparent"
        >
          <GiHamburgerMenu className="text-black text-[1.2rem]" />
        </Button>
        <div className="w-[1px] mx-5 bg-black h-10" />
        <Button className="flex items-center justify-center aspect-square hover:bg-transparent">
          <FiSearch className="text-black text-[1.6rem]" />
        </Button>
      </nav>
    </>
  );
};

export default Navbar;
