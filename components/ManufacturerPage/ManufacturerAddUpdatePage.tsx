"use client";
import React from "react";
//
import { useSearchParams } from "next/navigation";
// components
import { Switch } from "@mantine/core";
import InputComponent from "../Shared/InputComponent/InputComponent";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
//
type Props = {};
//
const ManufacturerAddUpdatePage = (props: Props) => {
  const searchParams = useSearchParams();
  const [isUpdate, setIsUpdate] = React.useState(
    searchParams.get("id") != "add"
  );
  React.useEffect(() => {
    const searchedId = searchParams.get("id");
  }, []);
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            {isUpdate ? "Update Manufacturer" : "Add Manufacturer"}
          </h1>
          <p className="text-gray-500">
            Please see Add or Update Manufacturer form below all connected
            channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add and Update Manufacturers!
            </p>
          </div>
          <form className="p-5 flex flex-col gap-5">
            <Switch
              size="md"
              label="Manufacturer Status"
              description="Active / In-Active"
            />
            <InputComponent
              placeholder="Manufacturer Name"
              size="md"
              label="Manufacturer Name"
              required={true}
              type={"text"}
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default ManufacturerAddUpdatePage;
