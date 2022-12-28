"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <>
      <Link href={"/dashboard/manufacturer/"}>manufacturer</Link>
    </>
  );
};

export default DashboardPage;
