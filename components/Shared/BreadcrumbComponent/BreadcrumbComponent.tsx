"use client";
import React from "react";
import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isUpdate?: boolean;
};
//
const convertBreadcrumb = (word: string) => {
  return word
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .replace("_", " ")
    .replace("_", " ")
    .replace("_", " ")
    .replace("_", " ");
};

const BreadcrumbComponent = ({ isUpdate }: Props) => {
  const router = usePathname();
  const [bread, setBread]: Array<any> = React.useState([]);
  React.useEffect(() => {
    const linkPath = router!.split("/");
    linkPath.shift();
    if (isUpdate) linkPath.pop();
    //
    const pathArray = linkPath.map((path: string, key: number) => {
      return {
        title: path,
        href: "/" + linkPath.slice(0, key + 1).join("/"),
      };
    });
    setBread(pathArray);
  }, [router]);

  return (
    <>
      <Breadcrumbs className="capitalize select-none mb-5 flex gap-3 text-[1.2rem]">
        {bread.map((link: any, key: number) => {
          if (link === bread[bread.length - 1]) {
            return (
              <span className="text-gray-500" key={key}>
                {convertBreadcrumb(link.title)}
              </span>
            );
          }
          return (
            <Link
              className="text-[#3b3e66] font-semibold hover:underline"
              key={key}
              href={link.href}
            >
              {convertBreadcrumb(link.title)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbComponent;
