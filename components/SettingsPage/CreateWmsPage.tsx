"use client";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
//
function Header() {
  return (
    <>
      <div className="mt-5 mb-7">
        <BreadcrumbComponent />
        <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
          Create WMS
        </h1>
        <p className="text-gray-500">
          Create the structure of your warehouse here!
        </p>
      </div>
    </>
  );
}
//
type WMSType = {
  path_no: number;
  side: string;
  shelf_no: number;
  bin_no: number;
};
function Form() {
  const form = useForm({
    initialValues: {
      path_no: 1,
      side: "",
      shelf_no: 1,
      bin_no: 1,
    },
  });
  // functions
  const submitHandler = (data: WMSType) => {};
  //
  return (
    <>
      <div className="p-5 flex flex-wrap gap-5">
        <form
          className="w-[47%] flex flex-col gap-5"
          onSubmit={form.onSubmit(submitHandler)}
        >
          <TextInput
            className="w-[100%]"
            size="md"
            label="Add Path"
            required
            withAsterisk
            type={"text"}
            {...form.getInputProps("path_no")}
          />
          <Select
            className="w-[100%]"
            placeholder="Select Side"
            label="Add Side"
            size="md"
            required
            withAsterisk
            data={["R01", "L01", "Both"]}
            {...form.getInputProps("side")}
          />
          <TextInput
            className="w-[100%]"
            size="md"
            label="Add Shelf"
            required
            withAsterisk
            type={"text"}
            {...form.getInputProps("shelf_no")}
          />
          <TextInput
            className="w-[100%]"
            size="md"
            label="Add Bin"
            required
            withAsterisk
            type={"text"}
            {...form.getInputProps("bin_no")}
          />
          <Button
            bg={"red"}
            className="ml-auto bg-red-500 hover:bg-red-900 transition-all w-56"
          >
            Save
          </Button>
        </form>
        <div className="w-[47%] select-none">
          Path represents : P01,P02,....
          <br />
          Side represents : R01,L01,R02,L02....
          <br />
          Shelf represents : S01,S02,....
          <br />
          Bin represents : B01,B02,.....
        </div>
      </div>
    </>
  );
}
//
type Props = {};
export default function CreateWmsPage(props: Props) {
  return (
    <>
      <section className="flex flex-col justify-center px-5 pb-7">
        <Header />
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your Warehouse!
            </p>
          </div>
          <Form />
        </div>
      </section>
    </>
  );
}
