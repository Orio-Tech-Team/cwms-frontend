"use client";
import React from "react";
import { Button, MultiSelect, Select, Switch, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { ProductDropDownData } from "../../modules/Product/ProductDropDownData";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import UseVendorData from "../../modules/Vendor/UseVendorData";
import UseProductData from "../../modules/Product/UseProductData";

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
  const [manufacturerData, setManufacturerData]: Array<any> =
    UseManufacturerData();
  const [vendorData, setVendorData]: Array<any> = UseVendorData();
  const [productData, setProductData]: any[] = UseProductData();
  //
  const [productTags, setProductTags]: Array<any> = React.useState([]);
  const [productGenericFormula, setProductGenericFormula]: Array<any> =
    React.useState([]);
  //
  const form = useForm({
    initialValues: {
      item_status: false,
      product_name: "",
      sku_description: "",
      sku_department: "",
      item_nature: "",
      manufacturer_id: "",
      tax_code: "",
      purchasing_unit: "",
      trade_price: "",
      discounted_price: "",
      maximum_retail_price: "",
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
      quantity: "",
      prescription_required: false,
      drap_id: "",
      dosage_instruction: "",
      side_effects: "",
      product_tags: [],
      product_generic_formula: [],
      product_conversion_su_1: "Carton",
      product_conversion_ic_1: "1",
      product_conversion_su_2: "",
      product_conversion_ic_2: "1",
      product_conversion_su_3: "",
      product_conversion_ic_3: "1",
    },
  });
  const submitHandler = (values: any) => {
    console.log(values);
  };
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
              data={["Consumer", "Medicine"]}
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
              data={["Refrigerator", "Room Temperature", "Narcotics"]}
              {...form.getInputProps("item_nature")}
            />
            <TextInput
              className="w-[47%]"
              placeholder=""
              size="md"
              label="Trade Price"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("trade_price")}
            />
            <TextInput
              className="w-[100%]"
              placeholder=""
              size="md"
              label="Maximum Retail Price"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("maximum_retail_price")}
            />
            <TextInput
              className="w-[47%]"
              placeholder=""
              size="md"
              label="Margin"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("margin")}
            />
            <TextInput
              className="w-[47%]"
              placeholder=""
              size="md"
              label="Purchasing Price"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("purchasing_price")}
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
              placeholder=""
              size="md"
              label="Sales Tax Percentage"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("sales_tax_percentage")}
            />
            <TextInput
              className="w-[100%]"
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
              placeholder="Pick Price Levels"
              size="md"
              label="Item Price Levels"
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
              label="Item Stock Nature"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={ProductDropDownData.stock_nature}
              {...form.getInputProps("stock_nature")}
            />
            <TextInput
              className="w-[100%]"
              placeholder="Enter Bar Code"
              size="md"
              label="Bar Code"
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
              className="w-[47%]"
              placeholder="Enter Side Effects"
              size="md"
              label="Side Effects"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("side_effects")}
            />

            <Select
              className="w-[47%]"
              placeholder="Pick Manufacturer"
              size="md"
              label="Manufacturer"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={manufacturerData.map((each_manufacturer: any) => {
                return {
                  value: each_manufacturer.id,
                  label: each_manufacturer.manufacturer_name,
                };
              })}
              {...form.getInputProps("manufacturer_id")}
            />

            <MultiSelect
              className="w-[47%]"
              placeholder="Select Product Tags"
              size="md"
              label="Product Tags"
              creatable
              clearable
              searchable
              maxSelectedValues={3}
              getCreateLabel={(query: any) => `Create ${query}`}
              onCreate={(query: any) => {
                const tag_temp = { value: query, label: query };
                setProductTags((pre: Array<any>) => [...pre, tag_temp]);
                return tag_temp;
              }}
              data={productTags}
              {...form.getInputProps("product_tags")}
            />
            <MultiSelect
              className="w-[47%]"
              placeholder="Select Product Generic Formula"
              size="md"
              label="Product Generic Formula"
              creatable
              clearable
              searchable
              maxSelectedValues={3}
              getCreateLabel={(query: any) => `Create ${query}`}
              onCreate={(query: any) => {
                const tag_temp = { value: query, label: query };
                setProductGenericFormula((pre: any[]) => [...pre, tag_temp]);
                return tag_temp;
              }}
              data={productGenericFormula}
              {...form.getInputProps("product_generic_formula")}
            />

            <div
              id="product_conversion_div"
              className="w-[100%] border rounded-md p-5 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span>Item Conversion</span>
                <div className="text-xs flex flex-col overflow-hidden">
                  <span>{`1 Carton Contains ${
                    form.getInputProps("product_conversion_ic_2").value
                  } ${
                    form.getInputProps("product_conversion_su_2").value
                  }`}</span>
                  <span
                    className={`transition-all ${
                      form.getInputProps("product_conversion_su_2").value ===
                      "Box"
                        ? "translate-x-0"
                        : "translate-x-80"
                    }`}
                  >{`${form.getInputProps("product_conversion_ic_2").value} ${
                    form.getInputProps("product_conversion_su_2").value
                  } Contains ${
                    form.getInputProps("product_conversion_ic_3").value
                  } ${
                    form.getInputProps("product_conversion_su_3").value
                  }`}</span>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
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
              <div className="flex justify-between flex-wrap">
                <Select
                  className="w-[47%]"
                  placeholder="Pick Selling Unit"
                  size="md"
                  label="Selling Unit"
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
                  label="Item Conversion"
                  required
                  withAsterisk
                  type={"text"}
                  {...form.getInputProps("product_conversion_ic_2")}
                />
              </div>
              <div
                className={`flex transition-all justify-between flex-wrap ${
                  form.getInputProps("product_conversion_su_2").value === "Box"
                    ? "scale-100"
                    : "scale-0 h-0"
                }`}
              >
                <Select
                  className="w-[47%]"
                  placeholder="Pick Selling Unit"
                  size="md"
                  label="Selling Unit"
                  searchable
                  nothingFound="No options"
                  data={["Strips", "Pieces"]}
                  {...form.getInputProps("product_conversion_su_3")}
                />
                <TextInput
                  className="w-[47%]"
                  placeholder="Enter Item Conversion"
                  size="md"
                  label="Item Conversion"
                  type={"text"}
                  {...form.getInputProps("product_conversion_ic_3")}
                />
              </div>
            </div>

            <TextInput
              className="w-[100%]"
              placeholder=""
              size="md"
              label="Quantity"
              //   required
              //   withAsterisk
              type={"text"}
              disabled
              {...form.getInputProps("quantity")}
            />

            <Button size="md" className="bg-red-500" type={"submit"}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ProductAddUpdatePage;
