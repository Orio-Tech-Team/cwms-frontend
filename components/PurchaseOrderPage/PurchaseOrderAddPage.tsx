"use client";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import ModalComponent from "../Shared/ModalComponent/ModalComponent";
import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";

type Props = {};

const PurchaseOrderAddPage = (props: Props) => {
  // Modal Work
  const [modalStatus, setModalStatus] = React.useState(false);
  const modalHandler = () => {
    setModalStatus((pre) => !pre);
  };
  //
  const form = useForm({
    initialValues: {
      vendor_name: "",
      expected_delivery_date: new Date(),
      delivery_location: "",
      order_type: "",
    },
  });
  //
  const submitHandler = (values: any) => {
    console.log(values);
  };
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Add Purchase Order
          </h1>
          <p className="text-gray-500">
            Please see Add Purchase Order form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center px-2 py-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add Purchase Order!
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values) => submitHandler(values))}
            className="p-5 flex flex-col gap-5"
          >
            <Button
              type={"button"}
              onClick={modalHandler}
              className="bg-[#ee2a54] transition-all font-light text-md text-white w-56  hover:bg-[#ef0639]"
            >
              Search Product
            </Button>
            <ModalComponent
              modalStatus={modalStatus}
              modalHandler={modalHandler}
            >
              <div>Hello</div>
            </ModalComponent>
            <div className="flex flex-wrap gap-5 justify-between">
              <Select
                className="w-[47%]"
                label="Vendor"
                placeholder="Select Vendor"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                data={["React", "Angular", "Svelte", "Vue"]}
                {...form.getInputProps("vendor_name")}
              />
              <DatePicker
                className="w-[47%]"
                placeholder="Pick date"
                label="Expected Delivery Date"
                required
                withAsterisk
                {...form.getInputProps("expected_delivery_date")}
              />
              <Select
                className="w-[47%]"
                label="Delivery Location"
                placeholder="Select Delivery Location"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                data={["React", "Angular", "Svelte", "Vue"]}
                {...form.getInputProps("delivery_location")}
              />
              <Select
                className="w-[47%]"
                label="Order Type"
                placeholder="Select Order Type"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                data={["React", "Angular", "Svelte", "Vue"]}
                {...form.getInputProps("order_type")}
              />
            </div>
            <div>
              <h2 className="font-semibold text-[1.2rem] text-[#3b3e66]">
                Order Cart
              </h2>
            </div>
            <Button
              className="bg-[#002884] hover:bg-[#0e2762] w-[300px]"
              type={"submit"}
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default PurchaseOrderAddPage;
