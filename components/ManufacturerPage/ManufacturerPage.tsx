"use client";
import React from "react";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import { Loader } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import Link from "next/link";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import { useRouter } from "next/navigation";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
type Props = {};

const ManufacturerPage = (props: Props) => {
  const router = useRouter();
  const [ManufacturerData, setManufacturerData]: Array<any> =
    UseManufacturerData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const updateHandler = async (_id: number) => {
    const manufacturer_response = await axiosFunction({
      urlPath: `/manufacturer/update/${_id}`,
    });
    const [data_to_send_temp] = manufacturer_response.data;
    localStorage.setItem(
      "manufacturer_data",
      JSON.stringify(data_to_send_temp)
    );
    router.push(`/dashboard/manufacturer/update_manufacturer/?id=${_id}`);
  };
  //
  const tableGenerator = () => {
    const columnsTemp = [
      {
        name: "ID",
        selector: (row: any) => row.id,
        grow: 0,
        center: true,
        width: "66px",
      },
      {
        name: "Manufacturer",
        selector: (row: any) => row.manufacturer_name,
        grow: 1,
        sortable: true,
      },
      {
        name: "LOB",
        selector: (row: any) => row.line_of_business,
        grow: 1,
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
        name: "Status",
        selector: (row: any) => (
          <span
            className={`font-semibold ${
              row.status === "Active" ? "text-green-700" : "text-red-700"
            }`}
          >
            {row.status}
          </span>
        ),
        grow: 0,
        width: "100px",
        center: true,
      },
      {
        name: "Actions",
        cell: (row: any) => (
          <>
            <span
              className="bg-[#002884] rounded-md w-5 h-5 flex justify-center items-center"
              onClick={() => updateHandler(row.id)}
            >
              <AiFillEdit className="text-white" />
            </span>
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
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Manufacturers
          </h1>
          <p className="text-gray-500">
            Please see manufacturers belsow from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Manufacturers!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/manufacturer/add_manufacturer/?id=add"}
            >
              Add Manufacturer
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

export default ManufacturerPage;
