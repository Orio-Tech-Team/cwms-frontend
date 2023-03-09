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
  const [productData, setProductData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const product_data_fetcher = async () => {
    setLoading(true);
    const response = await axiosFunction({ urlPath: "/product/find_for_dt" });
    setProductData(response.data);
    setLoading(false);
  };
  //
  React.useEffect(() => {
    product_data_fetcher();
  }, []);
  //
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // functions
  const updateHandler = async (_id: any) => {
    var category: any[] = [];
    var vendor: any[] = [];
    var productTags: any[] = [];
    var productGenericFormula: any[] = [];
    var product_conversion_su_1 = "Carton";
    var product_conversion_ic_1 = "1";
    var product_conversion_su_2 = "";
    var product_conversion_ic_2 = "1";
    var product_conversion_su_3 = "";
    var product_conversion_ic_3 = "1";
    //
    const data = await axiosFunction({
      urlPath: "/product/find",
      method: "post",
      data: { id: _id },
    });
    const filtered_product = data.data[0];

    if (filtered_product.product_conversions.length > 0) {
      var product_conversion = [...filtered_product.product_conversions];
      var sorted_conversion: any[] = product_conversion.sort(
        (obj1: any, obj2: any) => {
          if (obj1.sorting > obj2.sorting) {
            return 1;
          }
          if (obj1.sorting < obj2.sorting) {
            return -1;
          }
          return 0;
        }
      );

      if (sorted_conversion[1].selling_unit == "Box") {
        product_conversion_su_3 = sorted_conversion[2].selling_unit;
        product_conversion_ic_3 = sorted_conversion[2].item_conversion;
      }
      product_conversion_ic_1 = sorted_conversion[0].item_conversion;
      product_conversion_ic_2 = sorted_conversion[1].item_conversion;
      product_conversion_su_1 = sorted_conversion[0].selling_unit;
      product_conversion_su_2 = sorted_conversion[1].selling_unit;
    }

    if (filtered_product.product_generic_formulas.length > 0) {
      productGenericFormula = filtered_product.product_generic_formulas.map(
        (each_formula: any) => {
          return each_formula.product_generic_formula;
        }
      );
    }
    if (filtered_product.product_tags.length > 0) {
      productTags = filtered_product.product_tags.map((each_tag: any) => {
        return each_tag.tag;
      });
    }
    if (filtered_product.categories.length > 0) {
      category = filtered_product.categories.map((each_category: any) => {
        return each_category.id;
      });
    }

    if (filtered_product.vendors.length > 0) {
      vendor = filtered_product.vendors.map((each_vendor: any) => {
        return each_vendor.id;
      });
    }
    //
    const data_to_send_temp = {
      ...filtered_product,
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
        manufacturer_name: each_product.manufacturer.manufacturer_name,
        status: each_product.status ? "Active" : "In-Active",
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
