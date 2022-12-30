"use client";
import React from "react";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import { Button, Loader } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import Link from "next/link";
//
type Props = {};

const ManufacturerPage = (props: Props) => {
  const [ManufacturerData, setManufacturerData]: Array<any> =
    UseManufacturerData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const tableGenerator = () => {
    const columnsTemp = [
      {
        name: "#",
        cell: (row: any) => <>{row.key + 1}</>,
        grow: 0,
        width: "80px",
        sortable: true,
      },
      {
        name: "ID",
        selector: (row: any) => row.id,
        grow: 0,
        center: true,
        width: "66px",
        sortable: true,
      },
      {
        name: "Manufacturer",
        selector: (row: any) => row.manufacturer_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "LOB",
        selector: (row: any) => row.line_of_business,
        grow: 2,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row: any) => row.status,
        grow: 0,
        center: true,
        width: "190px",
      },
      {
        name: "Created At",
        selector: (row: any) => row.createdAt,
        grow: 0,
        center: true,
        width: "190px",
      },
      {
        name: "Updated At",
        selector: (row: any) => row.updatedAt,
        grow: 0,
        center: true,
        width: "190px",
      },
      {
        name: "Actions",
        cell: (row: any) => (
          <>
            <Link
              className="bg-[#002884] p-1 rounded-md text-white"
              href={`/dashboard/manufacturer/manufacturer/?id=${row.id}`}
            >
              <AiFillEdit />
            </Link>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        width: "90px",
        grow: 0,
      },
    ];
    const dataTemp = ManufacturerData.map((each_item: any, key: number) => {
      return {
        key: key,
        id: each_item.id,
        manufacturer_name: each_item.manufacturer_name,
        line_of_business: each_item.line_of_business,
        status: each_item.manufacturer_status ? "Active" : "In-Active",
        createdAt: each_item.createdAt.toString().substring(0, 10),
        updatedAt: each_item.updatedAt.toString().substring(0, 10),
      };
    });
    setColumns(columnsTemp);
    setData(dataTemp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [ManufacturerData]);
  //
  return (
    <>
      <main className="flex flex-col justify-center">
        <div className="mt-5 mb-7">
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Manufacturer
          </h1>
          <p className="text-gray-500">
            Please see manufacturers below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center my-5 px-2">
            <p className="font-semibold text-gray-500">
              Here you can manage your all Manufacturers!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/manufacturer/manufacturer/?id=add"}
            >
              Add Manufacturer
            </Link>
          </div>
          {isLoading ? (
            <Loader
              style={{ margin: "auto", padding: "10px 0px" }}
              color="dark"
              size="xl"
            />
          ) : (
            <DataTableComponent columns={columns} data={data} />
          )}
        </div>
      </main>
    </>
  );
};

export default ManufacturerPage;
