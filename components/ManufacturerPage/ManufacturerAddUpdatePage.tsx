"use client";
import React from "react";
//
import { useSearchParams } from "next/navigation";

type Props = {};

const ManufacturerAddUpdatePage = (props: Props) => {
  const searchParams = useSearchParams();
  return <div>{searchParams.get("id")}</div>;
};

export default ManufacturerAddUpdatePage;
