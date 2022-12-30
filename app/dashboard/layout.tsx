"use client";
import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarActive, setSidebarActive] = React.useState(true);
  const sidebarHandler = () => {
    setSidebarActive((pre: boolean) => {
      return !pre;
    });
  };
  //
  const mainDashboardClass = sidebarActive
    ? "overflow-y-scroll overflow-x-hidden w-[calc(100vw_-_300px)] h-[calc(100vh_-_70px)] transition-all p-2 bg-[#f4f5fd]"
    : "overflow-y-scroll overflow-x-hidden w-[100vw] h-[calc(100vh_-_70px)] transition-all p-2 bg-[#f4f5fd] ";
  //
  return (
    <section className="flex">
      <Sidebar sidebarActive={sidebarActive} />
      <div className="relative">
        <Navbar sidebarActive={sidebarActive} sidebarHandler={sidebarHandler} />
        <div className="h-[70px] w-[100%]" />
        <div className={mainDashboardClass}>{children}</div>
      </div>
    </section>
  );
}
