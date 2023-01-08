"use client";
import React from "react";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
// Components
import { Button, Select, Switch, TextInput } from "@mantine/core";
import UseCategoryData from "../../modules/Category/UseCategoryData";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import { formValidator } from "../../SharedFunctions/NumberValidator";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
type Props = {};
//
const CategoryAddUpdatePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdate = searchParams.get("id") != "add";
  const [categoryData, setCategoryData]: any[] = UseCategoryData();
  const parentCategories = categoryData.filter((each_category: any) => {
    return each_category.parent_id === null;
  });

  const [submitButtonDisabler, setSubmitButtonDisabler] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const form = useForm({
    validateInputOnChange: true,
    initialValues: isUpdate
      ? {
          ...JSON.parse(localStorage.getItem("category_data")!),
        }
      : {
          category_level: "Parent Level",
          category_name: "",
          comment: "",
          category_description: "",
          category_status: false,
          category_sorting: "",
          category_image: "",
          parent_id: null,
        },
    validate: (values) => {
      return {
        category_sorting: formValidator(
          values.category_sorting,
          "category_sorting",
          "number"
        ),
      };
    },
  });
  //
  const submitHandler = async (values: any) => {
    setSubmitButtonDisabler(true);
    const dataToSend = {
      ...values,
      parent_id:
        form.getInputProps("category_level").value === "Sub Level"
          ? values.parent_id
          : null,
    };
    const url_temp = isUpdate
      ? "/product/category/update/"
      : "/product/category/add_category/";

    const category_response = await axiosFunction({
      urlPath: url_temp,
      data: dataToSend,
      method: isUpdate ? "PUT" : "POST",
    });
    setCategoryData([]);
    const [new_category_id] = category_response.data.data;
    setNotification((pre) => {
      return {
        description: `Category with ID: ${[new_category_id]} ${
          isUpdate ? "Updated" : "Created"
        } successfully!`,
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });
    setTimeout(() => {
      router.push("/dashboard/categories/");
    }, 3000);
  };
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            {isUpdate ? "Update Category" : "Add Category"}
          </h1>
          <p className="text-gray-500">
            Please see Add or Update Category form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add and Update Categories!
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values: any) => submitHandler(values))}
            className="p-5 flex gap-5 justify-between flex-wrap"
          >
            <Switch
              size="md"
              className="w-[100%]"
              label="Category Status"
              description="Active / In-Active"
              {...form.getInputProps("category_status", {
                type: "checkbox",
              })}
            />
            <Select
              className={`transition-all ${
                form.getInputProps("category_level").value === "Sub Level"
                  ? " w-[47%]"
                  : " w-[100%]"
              }`}
              disabled={isUpdate}
              placeholder="Pick Category Level"
              size="md"
              label="Category Level"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={["Parent Level", "Sub Level"]}
              {...form.getInputProps("category_level")}
            />
            <Select
              className={`transition-all ${
                form.getInputProps("category_level").value === "Sub Level"
                  ? " w-[47%]"
                  : "translate-x-[999px] hidden"
              }`}
              placeholder="Pick Parent Category"
              size="md"
              label="Parent Category"
              required={
                form.getInputProps("category_level").value === "Sub Level"
              }
              withAsterisk
              searchable
              nothingFound="No options"
              data={
                parentCategories.length == 0
                  ? []
                  : parentCategories.map((each_category: any) => {
                      return {
                        value: each_category.id,
                        label: each_category.category_name,
                      };
                    })
              }
              {...form.getInputProps("parent_id")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Category Name"
              size="md"
              label="Category Name"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("category_name")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Description"
              size="md"
              label="Description"
              type={"text"}
              {...form.getInputProps("category_description")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Sorting Number"
              size="md"
              label="Sorting Number"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("category_sorting")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter URL for Image"
              size="md"
              label="URL for Image"
              type={"text"}
              {...form.getInputProps("category_image")}
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

export default CategoryAddUpdatePage;
