"use client";
import React from "react";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import UseVendorData from "../../modules/Vendor/UseVendorData";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { Loader } from "@mantine/core";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";

type Props = {};

const VendorPage = (props: Props) => {
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [vendorData, setVendorData]: Array<any> = UseVendorData();
  const tableGenerator = () => {
    const columnTemp = [
      {
        name: "ID",
        selector: (row: any) => row.id,
        grow: 0,
        center: true,
        width: "76px",
      },
      {
        name: "Vendor Name",
        selector: (row: any) => row.vendor_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Line of Business",
        selector: (row: any) => row.line_of_business,
        grow: 0,
        width: "140px",
        center: true,
      },
      {
        name: "Drug License Number",
        selector: (row: any) => row.drug_license_no,
        grow: 0,
        width: "130px",
        center: true,
      },
      {
        name: "Contact Person",
        selector: (row: any) => row.contact_person,
        grow: 0,
        width: "130px",
        center: true,
      },
      {
        name: "Business Phone Number",
        selector: (row: any) => row.business_phone_number,
        grow: 0,
        width: "200px",
        center: true,
      },
      {
        name: "Email Address",
        selector: (row: any) => row.email_address,
        grow: 0,
        width: "200px",
        center: true,
      },
      {
        name: "Payment Method",
        selector: (row: any) => row.payment_method,
        grow: 0,
        width: "100px",
        center: true,
      },
      {
        name: "Status",
        selector: (row: any) => (
          <span
            className={`font-semibold ${
              row.vendor_status === "Active" ? "text-green-700" : "text-red-700"
            }`}
          >
            {row.vendor_status}
          </span>
        ),
        grow: 0,
        width: "100px",
        center: true,
      },
      {
        name: "Action",
        cell: (row: any) => (
          <>
            <Link
              className="bg-[#002884] p-1 rounded-md text-white"
              href={`/dashboard/vendors/update_vendor/?id=${row.id}`}
            >
              <AiFillEdit />
            </Link>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        width: "80px",
        grow: 0,
      },
    ];
    const dataTemp = vendorData.map((each_product: any, key: number) => {
      return {
        key: key,
        id: each_product.id,
        vendor_name: each_product.vendor_name,
        line_of_business: each_product.line_of_business,
        drug_license_no: each_product.drug_license_no,
        contact_person: each_product.contact_person,
        business_phone_number: each_product.business_phone_number,
        email_address: each_product.email_address,
        payment_method: each_product.payment_method,
        vendor_status: each_product.vendor_status ? "Active" : "In-Active",
      };
    });
    setColumns(columnTemp);
    setData(dataTemp);
  };
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [vendorData]);
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Vendors
          </h1>
          <p className="text-gray-500">
            Please see vendors below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Vendors!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/vendors/add_vendor/?id=add"}
            >
              Add Vendor
            </Link>
          </div>
          {isLoading ? (
            <div className="py-10">
              <Loader
                style={{ margin: "auto", padding: "10px 0px" }}
                color="dark"
                size="xl"
              />
            </div>
          ) : (
            <DataTableComponent columns={columns} data={data} />
          )}
        </div>
      </main>
    </>
  );
};

export default VendorPage;
