"use client";
import React from "react";
//
import { useRouter, useSearchParams } from "next/navigation";
// components
import { Button, Select, Switch, TextInput } from "@mantine/core";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { useForm } from "@mantine/form";
import ManufacturerDropDownValues from "../../modules/Manufacturer/ManufacturerDropDownValues";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import { localStorageClearFunction } from "../../SharedFunctions/LocalStorageClearFunction";
//
type Props = {};
//
const ManufacturerAddUpdatePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdate = searchParams.get("id") != "add";
  const [manufactureData, setManufacturerData]: any[] = UseManufacturerData();
  const [submitButtonDisabler, setSubmitButtonDisabler] = React.useState(false);
  //
  const localStorageData = {
    ...JSON.parse(localStorage.getItem("manufacturer_data")!),
  };

  const form = useForm({
    initialValues: isUpdate
      ? {
          ...localStorageData,
        }
      : {
          manufacturer_name: "",
          line_of_business: "",
          status: false,
        },
  });
  //
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const submitHandler = async (values: any) => {
    setSubmitButtonDisabler(true);
    const url_temp = isUpdate
      ? "/manufacturer/update/"
      : "/manufacturer/create/";
    const manufacturer_response = await axiosFunction({
      urlPath: url_temp,
      data: values,
      method: "POST",
    });
    setManufacturerData([]);

    const new_manufacturer_id = manufacturer_response.data[0].id;
    setNotification((pre) => {
      return {
        description: `Manufacturer with ID: ${[new_manufacturer_id]} ${
          isUpdate ? "Updated" : "Created"
        } successfully!`,
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });
    localStorageClearFunction();
    setTimeout(() => {
      router.push("/dashboard/manufacturer/");
    }, 3000);
  };
  //
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
          <form
            onSubmit={form.onSubmit((values: any) => submitHandler(values))}
            className="p-5 flex gap-5 justify-between flex-wrap"
          >
            <Switch
              size="md"
              className="w-[100%]"
              label="Manufacturer Status"
              description="Active / In-Active"
              {...form.getInputProps("status", {
                type: "checkbox",
              })}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Manufacturer Name"
              size="md"
              label="Manufacturer Name"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("manufacturer_name")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Line Of Business"
              size="md"
              label="Line Of Business"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ManufacturerDropDownValues.line_of_business}
              {...form.getInputProps("line_of_business")}
            />
            <Button
              size="md"
              className="bg-red-500 w-56 ml-auto"
              type={"submit"}
              disabled={submitButtonDisabler}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
        <NotificationComponent
          description={notification.description}
          isSuccess={notification.isSuccess}
          title={notification.title}
          trigger={notification.trigger}
          setNotification={setNotification}
        />
      </main>
    </>
  );
};

export default ManufacturerAddUpdatePage;
