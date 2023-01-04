"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <>
      <div className="p-5 flex w-[100%] justify-center items-center h-[calc(100vh_-_100px)]">
        <h1 className="text-[1.6rem]">
          Sorry!
          <br />
          <strong>This Page is under Development!</strong>
        </h1>
      </div>
    </>
  );
};

export default DashboardPage;
