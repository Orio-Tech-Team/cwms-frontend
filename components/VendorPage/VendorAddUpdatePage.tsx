"use client";
import { Button, Radio, Select, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { VendorDropDownValues } from "../../modules/Vendor/VendorDropDownValues";
import { DatePicker } from "@mantine/dates";
import UseVendorTaxData from "../../modules/Vendor/UseVendorTaxData";
import DualListBoxComponent from "../Shared/DualListBoxComponent/DualListBoxComponent";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import UseVendorData from "../../modules/Vendor/UseVendorData";

type Props = {};

const VendorAddUpdatePage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdate = searchParams.get("id") != "add";

  //
  const updateFinder = async (_id: string) => {
    const vendor_response = await axiosFunction({
      urlPath: `/vendor/update/${_id}`,
    });
    var manufacturer_id_temp: any[] = [];
    vendor_response.data.manufacturer.forEach((each_manufacturer: any) => {
      manufacturer_id_temp.push(each_manufacturer.id);
    });
  };
  React.useEffect(() => {
    var searchedId = searchParams.get("id")!;
    if (searchedId != "add") {
      updateFinder(searchedId);
    }
  }, []);

  //
  const form = useForm({
    initialValues: isUpdate
      ? JSON.parse(localStorage.getItem("vendor_data")!)
      : {
          vendor_status: false,
          vendor_name: "",
          procurement_category: "",
          vendor_classification: "",
          manufacturer: [],
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
  const [manufacturerData, setManufacturerData]: any[] = UseManufacturerData();
  const [vendorData, setVendorData]: any[] = UseVendorData();
  const { withHoldTaxGroup, withHoldTaxPercentage } = UseVendorTaxData();
  //
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const submitHandler = async (value: any) => {
    if (value.manufacturer.length === 0) {
      setNotification((pre) => {
        return {
          description: "Select at least one manufacturer!",
          title: "Error",
          isSuccess: false,
          trigger: true,
        };
      });
      return;
    }
    //
    const vendor_id_response = await axiosFunction({
      urlPath: "/vendor/add_vendor/",
      data: value,
      method: "POST",
    });
    //
    setVendorData([]);
    const [new_vendor_id] = vendor_id_response.data.data;
    setNotification((pre) => {
      return {
        description: `Vendor with ID: ${[new_vendor_id]} created successfully!`,
        title: "Success",
        isSuccess: true,
        trigger: true,
      };
    });
    setTimeout(() => {
      router.push("/dashboard/vendors/");
    }, 3000);
  };
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
          <form
            onSubmit={form.onSubmit((values: any) => submitHandler(values))}
            className="p-5 flex gap-5 justify-between flex-wrap"
          >
            <Switch
              size="md"
              className="w-[100%]"
              label="Vendor Status"
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
            <DualListBoxComponent
              label="Manufacturers"
              data={manufacturerData.map((each_manufacturer: any) => {
                return {
                  value: each_manufacturer.id,
                  label: each_manufacturer.manufacturer_name,
                };
              })}
              {...form.getInputProps("manufacturer")}
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
              size="md"
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
              size="md"
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
              size="md"
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
            <TextInput
              className="w-[47%]"
              placeholder="Enter STRN"
              size="md"
              label="STRN"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("strn")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Drug License No"
              size="md"
              label="Drug License No"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("drug_license_no")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter Contact Person"
              size="md"
              label="Contact Person"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("contact_person")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter POC Phone Number"
              size="md"
              label="POC Phone Number"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("poc_phone_number")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter POC Email Address"
              size="md"
              label="POC Email Address"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("poc_email")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Business Address"
              size="md"
              label="Business Address"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("business_address")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick City"
              size="md"
              label="City"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.city}
              {...form.getInputProps("city")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Business Phone Number"
              size="md"
              label="Business Phone Number"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("business_phone_number")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Email Address"
              size="md"
              label="Email Address"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("email_address")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Payment Terms"
              size="md"
              label="Payment Terms"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.payment_terms}
              {...form.getInputProps("payment_terms")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Payment Method"
              size="md"
              label="Payment Method"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.method_of_payment}
              {...form.getInputProps("payment_method")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Vendor Credit Limit"
              size="md"
              label="Vendor Credit Limit"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("vendor_credit_limit")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter Lead Time"
              size="md"
              label="Lead Time"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("delivery_lead_time")}
            />
            <Select
              className="w-[31%]"
              placeholder="Pick Bank Name"
              size="md"
              label="Bank Name"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.bank_name}
              {...form.getInputProps("bank_name")}
            />
            <TextInput
              className="w-[31%]"
              placeholder="Enter Branch Code"
              size="md"
              label="Branch Code"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("bank_branch_code")}
            />
            <Select
              className="w-[31%]"
              placeholder="Pick Branch City"
              size="md"
              label="Branch City"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.city}
              {...form.getInputProps("branch_city")}
            />
            <TextInput
              className="w-[47%]"
              placeholder="Enter IBAN Number"
              size="md"
              label="IBAN Number"
              required
              withAsterisk
              type={"text"}
              {...form.getInputProps("account_ibn_number")}
            />
            <Select
              className="w-[47%]"
              placeholder="Pick Stock Return Policy"
              size="md"
              label="Stock Return Policy"
              required
              withAsterisk
              searchable
              nothingFound="No options"
              data={VendorDropDownValues.stock_return_policy}
              {...form.getInputProps("stock_return_policy")}
            />
            <Button
              size="md"
              className="bg-red-500 w-56 ml-auto"
              type={"submit"}
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

export default VendorAddUpdatePage;
