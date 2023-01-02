"use client";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import ModalComponent from "../Shared/ModalComponent/ModalComponent";
import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import UseVendorData from "../../modules/Vendor/UseVendorData";
import UseProductData from "../../modules/Product/UseProductData";
import UseLocationData from "../../modules/Location/UseLocationData";

type Props = {};

const PurchaseOrderAddPage = (props: Props) => {
  const [vendorData, setVendorData]: Array<any> = UseVendorData();
  const [productData, setProductData]: Array<any> = UseProductData();
  const [locationData, setLocationData]: Array<any> = UseLocationData();
  //
  const form = useForm({
    initialValues: {
      vendor_id: { label: "", value: "" },
      expected_delivery_date: "",
      delivery_location_id: "",
      order_type: "",
    },
  });
  const submitHandler = async (values: any) => {
    console.log(values);
  };
  //
  const productTableGenerator = () => {};
  React.useEffect(() => {
    console.log(locationData);
  }, [form.getInputProps("vendor_name").value]);
  // Modal Work
  const [modalStatus, setModalStatus] = React.useState(false);
  const modalHandler = () => {
    setModalStatus((pre) => !pre);
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
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add Purchase Order!
            </p>
          </div>
          <form
            onReset={() => form.reset()}
            onSubmit={form.onSubmit((values) => submitHandler(values))}
            className="p-5 flex flex-col gap-5"
          >
            <div className="flex gap-5">
              <Button
                type={"button"}
                onClick={modalHandler}
                className="bg-[#ee2a54] transition-all font-light text-md text-white w-56  hover:bg-[#ef0639]"
                disabled={form.getInputProps("vendor_name").value != ""}
              >
                Search Product
              </Button>
              <Button
                style={{
                  display:
                    form.getInputProps("vendor_name").value === ""
                      ? "none"
                      : "block",
                }}
                type={"reset"}
                className="bg-[#002884] transition-all font-light text-md text-white w-40  hover:bg-[#002884]"
              >
                Clear
              </Button>
            </div>
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
                data={vendorData.map((each_item: any) => {
                  return { label: each_item.vendor_name, value: each_item.id };
                })}
                {...form.getInputProps("vendor_name")}
              />
              <DatePicker
                className="w-[47%]"
                placeholder="Select Date"
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
                data={locationData.map((each_item: any) => {
                  return { label: each_item.loc_name, value: each_item.id };
                })}
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
                data={["Normal", "Advance"]}
                {...form.getInputProps("order_type")}
              />
            </div>
            <div className="rounded-md shadow-md">
              <h2 className="p-5 border-b-2 font-semibold text-[1.2rem] text-[#3b3e66]">
                Order Cart
              </h2>
              <DataTableComponent columns={[]} data={[]} />
            </div>

            <Button
              className="bg-[#002884] hover:bg-[#0e2762] w-[300px] ml-auto"
              type={"submit"}
            >
              Order
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default PurchaseOrderAddPage;
