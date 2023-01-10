"use client";
import React from "react";
import Link from "next/link";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
// Components
import UseCategoryData from "../../modules/Category/UseCategoryData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
//
type Props = {};

const CategoryPage = (props: Props) => {
  const router = useRouter();
  const [categoryData, setCategoryData]: any[] = UseCategoryData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const updateHandler = async (_id: number) => {
    const category_response = await axiosFunction({
      urlPath: `/product/category/update/${_id}`,
    });
    const [data_to_send_temp] = category_response.data;
    localStorage.setItem("category_data", JSON.stringify(data_to_send_temp));
    router.push(`/dashboard/categories/update_category/?id=${_id}`);
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
        name: "Category Name",
        selector: (row: any) => row.category_name,
        grow: 1,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row: any) => row.category_description || "-",
        grow: 0,
        width: "190px",
      },
      {
        name: "Sorting",
        selector: (row: any) => row.category_sorting,
        grow: 0,
        width: "100px",
      },
      {
        name: "Level",
        selector: (row: any) => row.category_level,
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
    //
    const child_temp: any[] = [];
    const dataTemp = categoryData.map((each_category: any, key: number) => {
      if (each_category.child && each_category.child.length > 0) {
        each_category.child.forEach((each_child: any) => {
          child_temp.push(each_child);
        });
      }
      return {
        key: key,
        ...each_category,
        status: each_category.category_status ? "Active" : "In-Active",
      };
    });
    const table_temp = [...child_temp, ...dataTemp];
    //
    setData(table_temp);
    setColumns(columnsTemp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [categoryData]);
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Category
          </h1>
          <p className="text-gray-500">
            Please see categories below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Category!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/categories/add_category/?id=add"}
            >
              Add Category
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

export default CategoryPage;
