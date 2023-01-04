"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
type Props = {
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive }: Props) => {
  const sidebarClass: string = sidebarActive
    ? "bg-[#ffffff] h-screen w-[300px] shadow-lg z-20 overflow-hidden transition-all"
    : "bg-[#ffffff] h-screen w-[0px] overflow-hidden z-20 transition-all translate-x-[-1000px]";
  return (
    <>
      <div className={sidebarClass}>
        <div className="h-[70px] border-gray-100"></div>
        <div className="p-5 border-y-2 h-[calc(100vh_-_140px)] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
          <ul className="flex flex-col gap-5">
            <li>
              <Link href={"/dashboard/"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/dashboard/manufacturer/"}>Manufacturer</Link>
            </li>
            <li>
              <Link href={"/dashboard/purchase_order/"}>Purchase Order</Link>
            </li>
            <li>
              <Link href={"/dashboard/products/"}>Product</Link>
            </li>
            <li>
              <Link href={"/dashboard/vendors/"}>Vendors</Link>
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
