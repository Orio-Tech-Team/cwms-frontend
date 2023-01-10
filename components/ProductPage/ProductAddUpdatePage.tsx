"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Button,
  MultiSelect,
  Radio,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { ProductDropDownData } from "../../modules/Product/ProductDropDownData";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import UseVendorData from "../../modules/Vendor/UseVendorData";
import UseProductData from "../../modules/Product/UseProductData";
import UseCategoryData from "../../modules/Category/UseCategoryData";
import DualListBoxComponent from "../Shared/DualListBoxComponent/DualListBoxComponent";
import RichTextComponent from "../Shared/RichTextComponent/RichTextComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";

type Props = {};

const ProductAddUpdatePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdate = searchParams.get("id") != "add";
  const [submitButtonDisabler, setSubmitButtonDisabler] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const [manufacturerData, setManufacturerData]: any[] = UseManufacturerData();
  const [vendorData, setVendorData]: any[] = UseVendorData();
  const [productData, setProductData]: any[] = UseProductData();
  const [categoryData, setCategoryData]: any[] = UseCategoryData();

  //
  const [productTags, setProductTags]: any[] = React.useState([]);
  const [productGenericFormula, setProductGenericFormula]: any[] =
    React.useState([]);
  //
  const form = useForm({
    initialValues: {
      item_status: false,
      product_name: "",
      sku_description: "",
      sku_department: "",
      item_nature: "",
      trade_discount: 0,
      manufacturer_id: "",
      tax_code: "",
      purchasing_unit: "",
      trade_price: 0,
      discounted_price: "",
      maximum_retail_price: 0,
      sku_minimum_level: "",
      sku_maximum_level: "",
      sku_reorder_level: "",
      sku_warehouse_lead_time: new Date(),
      item_release_level: "",
      price_levels: "",
      stock_nature: "",
      bar_code: "",
      item_storage_location: "",
      selling_discount: "",
      item_tracking_level: "",
      product_lifecycle: "",
      sales_tax_group: "",
      sales_tax_percentage: "",
      quantity: 0,
      prescription_required: false,
      drap_id: "",
      dosage_instruction: "",
      side_effects: "",
      discount_type: "price",
      margin: 0,
      purchasing_price: 0,
      productTags: [],
      category: [],
      vendor: [],
      productGenericFormula: [],
      product_conversion_su_1: "Carton",
      product_conversion_ic_1: "1",
      product_conversion_su_2: "",
      product_conversion_ic_2: "1",
      product_conversion_su_3: "",
      product_conversion_ic_3: "1",
    },
  });

  const submitHandler = async (values: any) => {
    if (values.category.length == 0) {
      setNotification({
        description: "Please select at least one category!",
        title: "Error",
        isSuccess: false,
        trigger: true,
      });
      return;
    }
    if (values.vendor.length == 0) {
      setNotification({
        description: "Please select at least one vendor!",
        title: "Error",
        isSuccess: false,
        trigger: true,
      });
      return;
    }

    //
    var productConversion: any[] = [];
    productConversion[0] = {
      selling_unit: values.product_conversion_su_1,
      item_conversion: values.product_conversion_ic_1,
    };
    productConversion[1] = {
      selling_unit: values.product_conversion_su_2,
      item_conversion: values.product_conversion_ic_2,
    };
    if (values.product_conversion_su_2 == "Box") {
      productConversion.push({
        selling_unit: values.product_conversion_su_3,
        item_conversion: values.product_conversion_ic_3,
      });
    }
    //
    setSubmitButtonDisabler(true);
    const url_temp = isUpdate ? "/product/update/" : "/product/add_product/";
    const data_to_send_temp = {
      ...values,
      productConversion: productConversion,
      margin: +values.maximum_retail_price - +values.trade_price,
    };
    //
    const product_id_response = await axiosFunction({
      urlPath: url_temp,
      data: data_to_send_temp,
      method: isUpdate ? "PUT" : "POST",
    });
    //
    setProductData([]);
    //
    const [new_product_id] = product_id_response.data.data;
    setNotification((pre) => {
      return {
        description: `Product with ID: ${[new_product_id]} ${
          isUpdate ? "Updated" : "Created"
        } successfully!`,
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });
    setTimeout(() => {
      router.push("/dashboard/products/");
    }, 3000);
  };
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            {isUpdate ? "Update Product" : "Add Product"}
          </h1>
          <p className="text-gray-500">
            Please see Add or Update Product form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add and Update Products!
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values: any) => submitHandler(values))}
            className="p-5 flex gap-5 justify-between flex-wrap"
          >
            <Switch
              size="md"
              className="w-[100%]"
              label="Product Status"
              description="Active / In-Active"
              {...form.getInputProps("item_status", { type: "checkbox" })}
            />
            <Switch
              size="md"
              className="w-[100%]"
              label="Prescription Required"
              description="Yes / No"
              {...form.getInputProps("prescription_required", {
                type: "checkbox",
              })}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Product Name"
              size="md"
              label="Product Name"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("product_name")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick SKU Department"
              size="md"
              label="SKU Department"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.sku_department}
              {...form.getInputProps("sku_department")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Item Nature"
              size="md"
              label="Item Nature"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.item_nature}
              {...form.getInputProps("item_nature")}
            />
            <TextInput
              className="w-[47%]"
              size="md"
              label="Trade Price"
              type={"text"}
              {...form.getInputProps("trade_price")}
              disabled
            />
            <TextInput
              className="w-[47%]"
              size="md"
              label="Maximum Retail Price"
              type={"text"}
              {...form.getInputProps("maximum_retail_price")}
              disabled
            />
            <TextInput
              className="w-[47%]"
              size="md"
              label="Trade Discount"
              type={"text"}
              {...form.getInputProps("trade_discount")}
              disabled
            />
            <div className="w-[100%] flex justify-between">
              <Radio.Group
                className="w-[47%]"
                orientation="vertical"
                label="Select Discount Type"
                spacing="xs"
                offset="md"
                size="md"
                {...form.getInputProps("discount_type")}
              >
                <Radio value="price" label="Discounted Price" />
                <Radio value="percentage" label="Discounted Percentage" />
              </Radio.Group>
              {form.getInputProps("discount_type").value == "price" ? (
                <TextInput
                  placeholder="Enter Discount Price"
                  className="w-[47%]"
                  size="md"
                  label="Discount Price"
                  type={"text"}
                  required
                  withAsterisk
                  {...form.getInputProps("discounted_price")}
                />
              ) : (
                <TextInput
                  placeholder="Enter Discount Percentage"
                  className="w-[47%]"
                  size="md"
                  label="Discount Percentage"
                  type={"text"}
                  required
                  withAsterisk
                  {...form.getInputProps("discounted_price")}
                />
              )}
            </div>
            <TextInput
              className="w-[47%]"
              size="md"
              label="Margins"
              type={"text"}
              {...form.getInputProps("margin")}
              disabled
            />
            <TextInput
              className="w-[47%]"
              size="md"
              label="Purchasing Price"
              type={"text"}
              {...form.getInputProps("purchasing_price")}
              disabled
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter SKU Minimum Level"
              size="md"
              label="SKU Minimum Level"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("sku_minimum_level")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter SKU Maximum Level"
              size="md"
              label="SKU Maximum Level"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("sku_maximum_level")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Sales Tax Group"
              size="md"
              label="Sales Tax Group"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.sales_tax_group}
              {...form.getInputProps("sales_tax_group")}
            />
            <TextInput
              className="w-[47%]"
              size="md"
              label="Sales Tax Percentage"
              type={"text"}
              value={form
                .getInputProps("sales_tax_group")
                .value.substring(
                  0,
                  form.getInputProps("sales_tax_group").value.indexOf("%")
                )}
              readOnly
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter SKU Reorder Level"
              size="md"
              label="SKU Reorder Level"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("sku_reorder_level")}
            />
            <DatePicker
              className="w-[47%]"
              placeholder="Pick SKU Warehouse Lead Time"
              size="md"
              label="SKU Warehouse Lead Time"
              required
              withAsterisk
              {...form.getInputProps("sku_warehouse_lead_time")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Item Release Level"
              size="md"
              label="Item Release Level"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.item_release_level}
              {...form.getInputProps("item_release_level")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Price Level"
              size="md"
              label="Price Level"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.price_levels}
              {...form.getInputProps("price_levels")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Stock Nature"
              size="md"
              label="Stock Nature"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.stock_nature}
              {...form.getInputProps("stock_nature")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Barcode"
              size="md"
              label="Barcode"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("bar_code")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Drap ID"
              size="md"
              label="Drap ID"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("drap_id")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Dosage Instructions"
              size="md"
              label="Dosage Instructions"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("dosage_instruction")}
            />
            <TextInput
              className="w-[100%]"
              placeholder="Enter Side Effects"
              size="md"
              label="Side Effects"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("side_effects")}
            />

            <div className="w-[100%] flex flex-col gap-2 border rounded-md shadow-md p-5">
              <header className="flex justify-between">
                <label className="mantine-InputWrapper-label mantine-Select-label mantine-1js7218">
                  Item Conversion
                </label>
                <div className="flex flex-col mantine-InputWrapper-label mantine-Select-label mantine-1js7218">
                  <span>
                    1 Carton Contains{" "}
                    {form.getInputProps("product_conversion_ic_2").value}{" "}
                    {form.getInputProps("product_conversion_su_2").value}
                  </span>
                  <span
                    className={`transition ${
                      form.getInputProps("product_conversion_su_2").value ==
                      "Box"
                        ? "scale-100"
                        : "scale-0 h-0"
                    }`}
                  >
                    1{" " + form.getInputProps("product_conversion_su_2").value}{" "}
                    Contains
                    {" " +
                      form.getInputProps("product_conversion_ic_3").value}{" "}
                    {form.getInputProps("product_conversion_su_3").value}
                  </span>
                </div>
              </header>

              <div className="w-[100%] flex justify-between">
                <Select
                  className="w-[47%]"
                  placeholder="Pick Selling Unit"
                  size="md"
                  label="Selling Unit"
                  required
                  withAsterisk
                  searchable
                  nothingFound="No options"
                  data={["Carton"]}
                  disabled
                  {...form.getInputProps("product_conversion_su_1")}
                />
                <TextInput
                  className="w-[47%]"
                  placeholder="Enter Item Conversion"
                  size="md"
                  label="Item Conversion"
                  required
                  withAsterisk
                  type={"text"}
                  disabled
                  {...form.getInputProps("product_conversion_ic_1")}
                />
              </div>
              <div className="w-[100%] flex justify-between">
                <Select
                  className="w-[47%]"
                  placeholder="Pick Selling Unit"
                  size="md"
                  // label="Selling Unit"
                  required
                  withAsterisk
                  searchable
                  nothingFound="No options"
                  data={["Box", "Pieces"]}
                  {...form.getInputProps("product_conversion_su_2")}
                />
                <TextInput
                  className="w-[47%]"
                  placeholder="Enter Item Conversion"
                  size="md"
                  // label="Item Conversion"
                  required
                  withAsterisk
                  type={"text"}
                  {...form.getInputProps("product_conversion_ic_2")}
                />
              </div>
              <div
                className={`w-[100%] flex justify-between transition-all ${
                  form.getInputProps("product_conversion_su_2").value == "Box"
                    ? "scale-100"
                    : "scale-0 h-0"
                }`}
              >
                <Select
                  className="w-[47%]"
                  placeholder="Pick Selling Unit"
                  size="md"
                  // label="Selling Unit"
                  required={
                    form.getInputProps("product_conversion_su_2").value == "Box"
                  }
                  withAsterisk
                  searchable
                  nothingFound="No options"
                  data={["Pieces", "Strips"]}
                  {...form.getInputProps("product_conversion_su_3")}
                />
                <TextInput
                  className="w-[47%]"
                  placeholder="Enter Item Conversion"
                  size="md"
                  // label="Item Conversion"
                  required={
                    form.getInputProps("product_conversion_su_2").value == "Box"
                  }
                  withAsterisk
                  type={"text"}
                  {...form.getInputProps("product_conversion_ic_3")}
                />
              </div>
            </div>
            <Select
              className="w-[100%]"
              placeholder="Pick Manufacturer"
              size="md"
              label="Manufacturer"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={
                manufacturerData.length > 0
                  ? manufacturerData.map((each_manufacturer: any) => ({
                      value: each_manufacturer.id,
                      label: each_manufacturer.manufacturer_name,
                    }))
                  : []
              }
              {...form.getInputProps("manufacturer_id")}
            />

            <DualListBoxComponent
              label="Categories"
              data={categoryData.map((each_category: any) => {
                return {
                  label: each_category.category_name,
                  options: each_category.child.map((each_child: any) => {
                    return {
                      value: each_child.id,
                      label: each_child.category_name,
                    };
                  }),
                };
              })}
              {...form.getInputProps("category")}
            />

            <DualListBoxComponent
              label="Vendors"
              data={vendorData.map((each_vendor: any) => {
                return {
                  label: each_vendor.vendor_name,
                  value: each_vendor.id,
                };
              })}
              {...form.getInputProps("vendor")}
            />
            <MultiSelect
              className="w-[47%]"
              size="md"
              label="Product Tags"
              data={productTags}
              placeholder="Select Product Tags"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setProductTags((current: any) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("productTags")}
            />
            <MultiSelect
              className="w-[47%]"
              size="md"
              label="Product Generic Formula"
              data={productGenericFormula}
              placeholder="Select Generic Formula"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setProductGenericFormula((current: any) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("productGenericFormula")}
            />
            <TextInput
              className="w-[100%]"
              size="md"
              label="Quantity"
              type={"text"}
              disabled
              {...form.getInputProps("quantity")}
            />
            <div className="w-[100%]">
              <label className="mantine-InputWrapper-label mantine-Select-label mantine-1js7218">
                SKU Description
              </label>
              <RichTextComponent {...form.getInputProps("sku_description")} />
            </div>
            <Button
              disabled={submitButtonDisabler}
              size="md"
              className="bg-red-500 w-56 ml-auto"
              type={"submit"}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ProductAddUpdatePage;
