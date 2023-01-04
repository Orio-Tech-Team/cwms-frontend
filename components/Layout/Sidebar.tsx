"use client";
import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@mantine/core";
type Props = {
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive }: Props) => {
  const sidebarClass: string = sidebarActive
    ? "bg-[#ffffff] h-screen w-[300px] shadow-lg z-20 overflow-hidden transition-all"
    : "bg-[#ffffff] h-screen w-[0px] overflow-hidden z-20 transition-all translate-x-[-1000px]";
  const linkClass: string =
    "transition-all h-10 flex justify-between items-center px-5 hover:bg-gray-100";
  return (
    <>
      <div className={sidebarClass}>
        <div className="h-[70px] border-gray-100"></div>
        <div className="border-y-2 h-[calc(100vh_-_140px)] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
          <ul className="flex flex-col gap-1">
            <li>
              <Link className={linkClass} href={"/dashboard/"}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className={linkClass} href={"/dashboard/products/"}>
                <span>Products</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
            <li>
              <Link className={linkClass} href={"/dashboard/vendors/"}>
                <span>Vendors</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
            <li>
              <Link className={linkClass} href={"/dashboard/manufacturer/"}>
                <span>Manufacturers</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
            <li>
              <Link className={linkClass} href={"/dashboard/purchase_order/"}>
                <span>Purchase Order</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-10 h-[70px] flex items-center">
          <Button
            color={"red"}
            className="bg-red-500 w-[100%] transition-all hover:bg-red-600"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
