"use client";
import React from "react";
import Link from "next/link";
type Props = {
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive }: Props) => {
  const sidebarClass: string = sidebarActive
    ? "bg-[#ffffff] h-screen w-[300px] shadow-lg z-20 transition-all"
    : "bg-[#ffffff] h-screen w-[0px] overflow-hidden z-20 transition-all translate-x-[-1000px]";
  return (
    <>
      <div className={sidebarClass}>
        <ul>
          <li>
            <Link href={"/dashboard/"}>Dashboard</Link>
          </li>
          <li>
            <Link href={"/dashboard/manufacturer/"}>Manufacturer</Link>
          </li>
          <li>
            <Link href={"/dashboard/purchase_order/"}>Purchase Order</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
