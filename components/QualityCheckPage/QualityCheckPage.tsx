"use client";
import { Button, Loader } from "@mantine/core";
import React from "react";
import UseGrnData from "../../modules/Grn/UseGrnData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";

type Props = {};

const QualityCheckPage = (props: Props) => {
  const [grnData, setGrnData]: any[] = UseGrnData();
  //
  const [buttonDisabler, setButtonDisabler] = React.useState(false);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //   functions
  const actionHandler = async (row: any, status: boolean) => {
    setButtonDisabler(true);
    var url = status ? "/grn/quality_checker/" : "/grn/quality_reject/";
    //
    await axiosFunction({
      method: "POST",
      urlPath: url,
      data: row,
    });
    setGrnData([]);
    setButtonDisabler(false);
  };
  //
  const tableGenerator = () => {
    const data_temp = grnData.filter((each_grn: any) => {
      return !each_grn.qc_check && each_grn.grn_status != "D";
    });
    setData(data_temp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [grnData]);
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Quality Check
          </h1>
          <p className="text-gray-500">
            Please see Quality Check below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all quality checks!
            </p>
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
            <DataTableComponent
              columns={[
                {
                  name: "PO. ID",
                  selector: (row: any) => row.po_id,
                  grow: 0,
                  center: true,
                  width: "70px",
                },
                {
                  name: "Prod. ID",
                  selector: (row: any) => row.product_id,
                  grow: 0,
                  center: true,
                  width: "80px",
                },
                {
                  name: "Product Name",
                  selector: (row: any) => row.product_name,
                  grow: 2,
                  sortable: true,
                },
                {
                  name: "Req. Qty",
                  selector: (row: any) => row.required_quantity,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "Rec. Qty",
                  selector: (row: any) => row.received_quantity,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "MRP.",
                  selector: (row: any) => row.maximum_retail_price,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "T.P",
                  selector: (row: any) => row.trade_price,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "Disc %",
                  selector: (row: any) => row.discounted_percentage,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "Batch No.",
                  selector: (row: any) => row.batch_no,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "Batch Expiry",
                  selector: (row: any) => row.batch_expiry,
                  grow: 0,
                  center: true,
                  width: "120px",
                },
                {
                  name: "Comments",
                  selector: (row: any) => row.comments,
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  name: "FOC",
                  selector: (row: any) => (row.foc ? "Yes" : "No"),
                  grow: 0,
                  center: true,
                  width: "100px",
                },
                {
                  cell: (row: any) => (
                    <>
                      <Button
                        className="transition-all bg-green-500 hover:bg-green-900"
                        disabled={buttonDisabler}
                        radius={"xs"}
                        compact
                        onClick={() => actionHandler(row, true)}
                      >
                        Approve
                      </Button>
                    </>
                  ),

                  grow: 0,
                  button: true,
                  center: true,
                  width: "100px",
                },
                {
                  cell: (row: any) => (
                    <>
                      <Button
                        className="transition-all bg-red-500 hover:bg-red-900"
                        disabled={buttonDisabler}
                        radius={"xs"}
                        color={"red"}
                        compact
                        onClick={() => actionHandler(row, false)}
                      >
                        Reject
                      </Button>
                    </>
                  ),
                  grow: 0,
                  button: true,
                  center: true,
                  width: "100px",
                },
              ]}
              data={data}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default QualityCheckPage;
