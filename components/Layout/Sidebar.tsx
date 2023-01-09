"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "@mantine/core";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
type Props = {
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive }: Props) => {
  const router = useRouter();
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  const sidebarClass: string = sidebarActive
    ? "bg-[#ffffff] h-screen w-[300px] shadow-lg z-20 overflow-hidden transition-all"
    : "bg-[#ffffff] h-screen w-[0px] overflow-hidden z-20 transition-all translate-x-[-1000px]";
  const linkClass: string =
    "transition-all h-10 flex justify-between items-center px-5 hover:bg-gray-100";
  //
  const logoutHandler = () => {
    setCookie("token", "");
    setCookie("type", "");
    setCookie("user_id", "");
    setCookie("account_number", "");
    setNotification((pre) => {
      return {
        description: "Sign Out Successfully!",
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });
    //
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };
  //
  return (
    <>
      <div className={sidebarClass}>
        <div className="h-[70px] border-gray-100 flex justify-center items-center">
          <div className="w-[170px] h-[60px] flex items-center">
            <Image
              priority
              className="h-auto w-auto"
              src="/pharm_logo.png"
              width={100}
              height={60}
              alt="Pharmacy Logo"
            />
          </div>
        </div>
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
              <Link className={linkClass} href={"/dashboard/categories/"}>
                <span>Categories</span>
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
            <li>
              <Link
                className={linkClass}
                href={"/dashboard/purchase_order/create_grn/"}
              >
                <span>Create GRN</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
            <li>
              <Link
                className={linkClass}
                href={"/dashboard/purchase_order/quality_check/"}
              >
                <span>Quality Check</span>
                <span className="text-xl flex justify-center items-center">
                  <MdKeyboardArrowRight />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-10 h-[70px] flex items-center">
          <Button
            onClick={logoutHandler}
            color={"red"}
            className="bg-red-500 w-[100%] transition-all hover:bg-red-600"
          >
            Sign Out
          </Button>
        </div>
        <NotificationComponent
          description={notification.description}
          isSuccess={notification.isSuccess}
          title={notification.title}
          trigger={notification.trigger}
          setNotification={setNotification}
        />
      </div>
    </>
  );
};

export default Sidebar;
