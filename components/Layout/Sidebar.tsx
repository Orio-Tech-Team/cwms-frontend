import React from "react";

type Props = {
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive }: Props) => {
  const sidebarClass: string = sidebarActive
    ? "bg-[#ffffff] h-screen w-[300px] shadow-lg z-20 transition-all"
    : "bg-[#ffffff] h-screen w-[0px] overflow-hidden z-20 transition-all translate-x-[-1000px]";
  return (
    <>
      <div className={sidebarClass}>Side Bar</div>
    </>
  );
};

export default Sidebar;
