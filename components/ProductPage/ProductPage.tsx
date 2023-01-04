"use client";
import React from "react";
import { Loader } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import Link from "next/link";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import UseProductData from "../../modules/Product/UseProductData";

type Props = {};

const ProductPage = (props: Props) => {
  const [productData, setProductData]: Array<any> = UseProductData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
        name: "Product Name",
        selector: (row: any) => row.product_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Manufacturer Name",
        selector: (row: any) => row.manufacturer_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Purchasing Unit",
        selector: (row: any) => row.purchasing_unit,
        grow: 0,
        width: "106px",
        center: true,
      },
      {
        name: "Trade Price",
        selector: (row: any) => row.trade_price,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "Discounted Price",
        selector: (row: any) => row.discounted_price,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "MRP",
        selector: (row: any) => row.maximum_retail_price,
        grow: 0,
        width: "80px",
        center: true,
      },
      {
        name: "Stock Nature",
        selector: (row: any) => row.stock_nature,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "Quantity",
        selector: (row: any) => row.quantity,
        grow: 0,
        width: "86px",
        center: true,
      },
      {
        name: "Status",
        selector: (row: any) => (
          <span
            className={`font-semibold ${
              row.item_status === "Active" ? "text-green-700" : "text-red-700"
            }`}
          >
            {row.item_status}
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
              href={`/dashboard/products/update_product/?id=${row.id}`}
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
    //
    const dataTemp = productData.map((each_product: any, key: number) => {
      return {
        key: key,
        id: each_product.id,
        product_name: each_product.product_name,
        manufacturer_name: each_product.manufacturer_name,
        purchasing_unit: each_product.purchasing_unit,
        trade_price: each_product.trade_price,
        discounted_price: each_product.discounted_price,
        maximum_retail_price: each_product.maximum_retail_price,
        stock_nature: each_product.stock_nature,
        quantity: each_product.quantity,
        item_status: each_product.item_status ? "Active" : "In-Active",
      };
    });
    //
    setColumns(columnTemp);
    setData(dataTemp);
  };
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [productData]);
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Products
          </h1>
          <p className="text-gray-500">
            Please see products below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Products!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/products/add_product/?id=add"}
            >
              Add Product
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

export default ProductPage;
