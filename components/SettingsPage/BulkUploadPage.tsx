"use client";

import { Button, FileInput } from "@mantine/core";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import React from "react";
import fileHandler from "../../SharedFunctions/FileHandler";
import customNotification from "../../SharedFunctions/CustomNotification";
import base64Converter from "../../SharedFunctions/base64Converter";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const Header = () => {
  return (
    <>
      <header className="mt-5 mb-7">
        <BreadcrumbComponent />
        <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
          Bulk Upload
        </h1>
        <p className="text-gray-500">
          Please see bulk upload below from all connected channels
        </p>
      </header>
    </>
  );
};
//
const ProductUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  //
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //
    const isError = fileHandler(file);
    //
    if (isError)
      return customNotification({
        message: "File isn't csv or its size is greater than 10mb!",
        title: "Failed",
      });
    //
    const base64 = await base64Converter(file!);
    //
    const response = await axiosFunction({
      urlPath: "/bulk_upload/product_upload",
      data: { csv: base64 },
      method: "POST",
    });
  };
  //
  return (
    <form className="flex gap-5 items-end" onSubmit={submitHandler}>
      <FileInput
        className="w-[50%]"
        label="Product Upload"
        placeholder="Select product csv to upload"
        onChange={setFile}
        value={file}
        accept=".csv"
        required
        clearable
      />
      <Button
        type={"submit"}
        className="bg-red-500 hover:bg-red-900 transition-all hover:scale-110"
      >
        Upload
      </Button>
    </form>
  );
};
//
const VendorUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  //
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //
    const isError = fileHandler(file);
    //
    if (isError)
      return customNotification({
        message: "File isn't csv or its size is greater than 10mb!",
        title: "Failed",
      });
    //
    const base64 = await base64Converter(file!);
    //
    const response = await axiosFunction({
      urlPath: "/bulk_upload/vendor_upload",
      data: { csv: base64 },
      method: "POST",
    });
  };
  //
  return (
    <form className="flex gap-5 items-end" onSubmit={submitHandler}>
      <FileInput
        className="w-[50%]"
        label="Vendor Upload"
        placeholder="Select vendor csv to upload"
        onChange={setFile}
        value={file}
        accept=".csv"
        required
        clearable
      />
      <Button
        type={"submit"}
        className="bg-red-500 hover:bg-red-900 transition-all hover:scale-110"
      >
        Upload
      </Button>
    </form>
  );
};
//
const CategoryUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  //
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //
    const isError = fileHandler(file);
    //
    if (isError)
      return customNotification({
        message: "File isn't csv or its size is greater than 10mb!",
        title: "Failed",
      });
    //
    const base64 = await base64Converter(file!);
    //
    const response = await axiosFunction({
      urlPath: "/bulk_upload/category_upload",
      data: { csv: base64 },
      method: "POST",
    });
  };
  //
  return (
    <form className="flex gap-5 items-end" onSubmit={submitHandler}>
      <FileInput
        className="w-[50%]"
        label="Category Upload"
        placeholder="Select category csv to upload"
        onChange={setFile}
        value={file}
        accept=".csv"
        required
        clearable
      />
      <Button
        type={"submit"}
        className="bg-red-500 hover:bg-red-900 transition-all hover:scale-110"
      >
        Upload
      </Button>
    </form>
  );
};
//
const ManufacturerUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  //
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    //
    const isError = fileHandler(file);
    //
    if (isError)
      return customNotification({
        message: "File isn't csv or its size is greater than 10mb!",
        title: "Failed",
      });
    //
    const base64 = await base64Converter(file!);
    //
    const response = await axiosFunction({
      urlPath: "/bulk_upload/manufacturer_upload",
      data: { csv: base64 },
      method: "POST",
    });
  };
  //
  return (
    <form className="flex gap-5 items-end" onSubmit={submitHandler}>
      <FileInput
        className="w-[50%]"
        label="Manufacturer Upload"
        placeholder="Select manufacturer csv to upload"
        onChange={setFile}
        value={file}
        accept=".csv"
        required
        clearable
      />
      <Button
        type={"submit"}
        className="bg-red-500 hover:bg-red-900 transition-all hover:scale-110"
      >
        Upload
      </Button>
    </form>
  );
};
//
export default function BulkUploadPage() {
  return (
    <section className="flex flex-col justify-center px-5 pb-7">
      <Header />
      <div className="shadow-xl border border-gray-100 rounded-md bg-white">
        <div className="flex justify-between items-center p-5 border-b-[1px]">
          <p className="font-semibold py-2 text-gray-500">
            Here you can manage your all Bulk Uploads!
          </p>
        </div>
        <div className="p-5 flex gap-5 flex-col">
          <ProductUpload />
          <CategoryUpload />
          <VendorUpload />
          <ManufacturerUpload />
        </div>
      </div>
    </section>
  );
}
