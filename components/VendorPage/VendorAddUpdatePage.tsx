"use client";
import { Radio, Select, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "next/navigation";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { VendorDropDownValues } from "../../modules/Vendor/VendorDropDownValues";
import { DatePicker } from "@mantine/dates";
import UseVendorTaxData from "../../modules/Vendor/UseVendorTaxData";

type Props = {};

const VendorAddUpdatePage = (props: Props) => {
  const { withHoldTaxGroup, withHoldTaxPercentage } = UseVendorTaxData();
  const searchParams = useSearchParams();
  const isUpdate = searchParams.get("id") != "add";
  const form = useForm({
    initialValues: {
      vendor_status: false,
      vendor_name: "",
      procurement_category: "",
      vendor_classification: "",
      ntn: "",
      cnic: "",
      cnic_expiry_date: new Date(),
      line_of_business: "",
      tax_exemption_validity: new Date(),
      with_hold_tax_group: "",
      with_hold_tax_percentage: "",
      sales_tax_group: "",
      sales_tax_percentage: "",
      strn: "",
      drug_license_no: "",
      tax_status: "filer",
      drug_sales_license: "yes",
      tax_exemption: "yes",
      contact_person: "",
      poc_phone_number: "",
      poc_email: "",
      business_address: "",
      city: "",
      business_phone_number: "",
      email_address: "",
      payment_terms: "",
      payment_method: "",
      vendor_credit_limit: "",
      delivery_lead_time: "",
      bank_name: "",
      bank_branch_code: "",
      branch_city: "",
      account_ibn_number: "",
      vendor_wise_discount: "",
      stock_return_policy: "",
      advance_income_tax: "",
      gst: "",
      minimum_order_quantity: "",
    },
  });
  //

  //
  React.useEffect(() => {
    const searchedId = searchParams.get("id");
  }, []);
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            {isUpdate ? "Update Vendor" : "Add Vendor"}
          </h1>
          <p className="text-gray-500">
            Please see Add or Update Vendor form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add and Update Vendors!
            </p>
          </div>
          <form className="p-5 flex gap-5 justify-between flex-wrap">
            <Switch
              size="md"
              className="w-[100%]"
              label="Product Status"
              description="Active / In-Active"
              {...form.getInputProps("vendor_status", { type: "checkbox" })}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Vendor Name"
              size="md"
              label="Vendor Name"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("vendor_name")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Procurement Category"
              size="md"
              label="Procurement Category"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.procurement_category}
              {...form.getInputProps("procurement_category")}
            />
            <Select
              className="w-[100%]"
              placeholder="Pick Vendor Classification"
              size="md"
              label="Vendor Classification"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.vendor_classification}
              {...form.getInputProps("vendor_classification")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter NTN"
              size="md"
              label="NTN"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("ntn")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter CNIC No"
              size="md"
              label="CNIC No"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("cnic")}
            />
            <DatePicker
              className="w-[31%]"
              placeholder="Pick CNIC Expiry Date"
              size="md"
              label="CNIC Expiry Date"
              required
              withAsterisk
              {...form.getInputProps("cnic_expiry_date")}
            />
            <Radio.Group
              className="w-[31%]"
              name="tax_status"
              orientation="vertical"
              label="Select Tax Status"
              spacing="xs"
              size="xs"
              withAsterisk
              {...form.getInputProps("tax_status")}
            >
              <Radio value="filer" label="Filer" />
              <Radio value="non-filer" label="Non-Filer" />
            </Radio.Group>
            <Radio.Group
              className="w-[31%]"
              name="drug_sales_license"
              orientation="vertical"
              label="Select Drug Sale License"
              spacing="xs"
              size="xs"
              withAsterisk
              {...form.getInputProps("drug_sales_license")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            <Radio.Group
              className="w-[31%]"
              name="tax_exemption"
              orientation="vertical"
              label="Select Tax Exemption"
              spacing="xs"
              size="xs"
              withAsterisk
              {...form.getInputProps("tax_exemption")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            <Select
              className="w-[47%]"
              placeholder="Pick Line of Business"
              size="md"
              label="Line of Business"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.line_of_business}
              {...form.getInputProps("line_of_business")}
            />
            <DatePicker
              className="w-[47%]"
              placeholder="Pick Tax Exemption Validity"
              size="md"
              label="Tax Exemption Validity"
              disabled={form.getInputProps("tax_exemption").value === "no"}
              required={form.getInputProps("tax_exemption").value === "yes"}
              withAsterisk={form.getInputProps("tax_exemption").value === "yes"}
              {...form.getInputProps("tax_exemption_validity")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick With Hold Tax Group"
              size="md"
              label="With Hold Tax Group"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={withHoldTaxGroup}
              {...form.getInputProps("with_hold_tax_group")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick With Hold Tax Percentage"
              size="md"
              label="With Hold Tax Percentage"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={withHoldTaxPercentage}
              {...form.getInputProps("with_hold_tax_percentage")}
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default VendorAddUpdatePage;
