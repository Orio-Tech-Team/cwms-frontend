"use client";
import React from "react";
import { Loader } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import Link from "next/link";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import UseProductData from "../../modules/Product/UseProductData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import { useRouter } from "next/navigation";

type Props = {};

const ProductPage = (props: Props) => {
  const router = useRouter();
  const [productData, setProductData]: Array<any> = UseProductData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // functions
  const updateHandler = async (_id: any) => {
    var category: any[] = [];
    var productTags: any[] = [];
    var vendor: any[] = [];
    var productGenericFormula: any[] = [];
    var product_conversion_su_1 = "Carton";
    var product_conversion_ic_1 = "1";
    var product_conversion_su_2 = "";
    var product_conversion_ic_2 = "1";
    var product_conversion_su_3 = "";
    var product_conversion_ic_3 = "1";
    //
    const [found_data] = productData.filter(
      (each_product: any) => each_product.id == _id
    );
    //
    const response = await axiosFunction({
      urlPath: "/product/find_for_update",
      data: { _id },
      method: "post",
    });
    //
    if (response.data.product_categories.length > 0) {
      response.data.product_categories.forEach((each_category: any) => {
        category.push(each_category.categoryId);
      });
    }
    //
    if (response.data.product_generic.length > 0) {
      response.data.product_generic.forEach((each_formula: any) => {
        productGenericFormula.push(each_formula.product_generic_formula);
      });
    }
    //
    if (response.data.product_tags.length > 0) {
      response.data.product_tags.forEach((each_tag: any) => {
        productTags.push(each_tag.tag_name);
      });
    }
    //
    if (response.data.product_vendors.length > 0) {
      response.data.product_vendors.forEach((each_vendor: any) => {
        vendor.push(each_vendor.vendorId);
      });
    }
    if (response.data.product_conversion.length > 0) {
      product_conversion_su_1 =
        response.data.product_conversion[0].selling_unit;
      product_conversion_ic_1 =
        response.data.product_conversion[0].item_conversion;
      product_conversion_su_2 =
        response.data.product_conversion[1].selling_unit;
      product_conversion_ic_2 =
        response.data.product_conversion[1].item_conversion;
      product_conversion_su_3 =
        response.data.product_conversion[2].selling_unit;
      product_conversion_ic_3 =
        response.data.product_conversion[2].item_conversion;
    }
    //
    const data_to_send_temp = {
      ...found_data,
      quantity: found_data.quantity == "" ? 0 : found_data.quantity,

      manufacturer_id: found_data.manufacturerId,
      purchasing_price: 0,
      category,
      productTags,
      vendor,
      productGenericFormula,
      product_conversion_su_1,
      product_conversion_ic_1,
      product_conversion_su_2,
      product_conversion_ic_2,
      product_conversion_su_3,
      product_conversion_ic_3,
    };
    localStorage.setItem("product_data", JSON.stringify(data_to_send_temp));
    router.push(`/dashboard/products/update_product/?id=${_id}`);
  };
  //
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
        width: "80px",
        grow: 0,
      },
    ];
    //
    const dataTemp = productData.map((each_product: any, key: number) => {
      return {
        ...each_product,
        key: key,
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
