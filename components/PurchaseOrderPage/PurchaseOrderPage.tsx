"use client";
import { Loader, Button, TextInput } from "@mantine/core";
import { ImBin2 } from "react-icons/im";
import Link from "next/link";
import React from "react";
import UsePurchaseOrderData from "../../modules/PurchaseOrder/UsePurchaseOrderData";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import ModalComponent from "../Shared/ModalComponent/ModalComponent";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
type Props = {};

const PurchaseOrderPage = (props: Props) => {
  const [PurchaseOrderData, setPurchaseOrderData]: Array<any> =
    UsePurchaseOrderData();
  const [columns, setColumns]: Array<any> = React.useState([]);
  const [data, setData]: Array<any> = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalActive, setModalActive] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");
  const [comment, setComment] = React.useState("");
  //
  const modalConfirmHandler = (_id: any) => {
    setModalActive(true);
    setSelectedId(_id);
  };
  const modalCancelFunction = async () => {
    await axiosFunction({
      urlPath: "/purchase_order/cancel/",
      data: {
        _id: selectedId,
        comment: comment,
      },
      method: "POST",
    });

    setPurchaseOrderData([]);
    setTimeout(() => {
      setSelectedId("");
      setComment("");
      setModalActive(false);
    }, 2000);
  };
  //
  const tableGenerator = () => {
    const invoiceGenerator = (row: any) => {
      const [searched_purchase_order] = PurchaseOrderData.filter(
        (each_purchase_order: any) => {
          return each_purchase_order.id == row.id;
        }
      );
      localStorage.setItem(
        "invoice_data",
        JSON.stringify(searched_purchase_order)
      );
      const url = `http://${window.location.hostname}:4000/invoice/`;
      window.open(url);
    };
    const actionFunction = async (row: any) => {
      const id = row.id;
      await axiosFunction({
        urlPath: `/purchase_order/order_approved/${id}`,
        method: "PUT",
      });
      setPurchaseOrderData([]);
    };
    //
    const columnTemp = [
      {
        name: "#",
        cell: (row: any) => <>{row.key + 1}</>,
        grow: 0,
        center: true,
        width: "56px",
      },
      {
        name: "Order #",
        selector: (row: any) => row.id,
        grow: 0,
        sortable: true,
      },
      {
        name: "Vendor Name",
        selector: (row: any) => row.vendor_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Order Type",
        selector: (row: any) => row.order_type,
        grow: 0,
        width: "126px",
        center: true,
      },
      {
        name: "Grand Total",
        selector: (row: any) => row.grand_total,
        grow: 0,
        width: "126px",
        center: true,
      },
      {
        name: "Expected Date",
        selector: (row: any) => row.expected_date.substring(0, 10),
        grow: 0,
        sortable: false,
        center: true,
        width: "156px",
      },
      {
        name: "Status",
        selector: (row: any) =>
          row.order_status == "Cancel"
            ? "Canceled"
            : row.order_status == "App"
            ? "Approved"
            : "Pending",
        grow: 0,
        center: true,
        sortable: false,
      },
      {
        name: "Action",
        cell: (row: any) => (
          <>
            <Button
              disabled={row.order_status == "Cancel"}
              compact
              className="bg-[#002884]"
              onClick={() =>
                row.order_status === "App"
                  ? invoiceGenerator(row)
                  : actionFunction(row)
              }
            >
              {row.order_status == "Cancel"
                ? "Canceled"
                : row.order_status === "Pen"
                ? "Approve"
                : "Invoice"}
            </Button>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        grow: 0,
      },
      {
        center: true,
        ignoreRowClick: true,
        allowOverflow: true,
        grow: 0,
        width: "70px",
        cell: (row: any) => (
          <>
            <Button
              disabled={row.order_status != "Pen" && row.order_status != "App"}
              onClick={() => modalConfirmHandler(row.id)}
              className="bg-red-500 flex justify-center items-center h-6 w-4 rounded-md"
            >
              <ImBin2 className="text-white flex justify-center items-center" />
            </Button>
          </>
        ),
      },
    ];
    //
    const dataTemp = PurchaseOrderData.map((each_item: any, key: number) => {
      return {
        key: key,
        id: each_item.id,
        vendor_name: each_item.vendor_name,
        grand_total: each_item.grand_total,
        expected_date: each_item.expected_date,
        order_status: each_item.order_status,
        order_type: each_item.order_type,
      };
    });

    setColumns(columnTemp);
    setData(dataTemp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [PurchaseOrderData]);
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Purchase Order
          </h1>
          <p className="text-gray-500">
            Please see purchase order below from all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold py-2 text-gray-500">
              Here you can manage your all Purchase Orders!
            </p>
            <Link
              className="bg-[#002884] py-2 px-5 rounded-md text-white"
              href={"/dashboard/purchase_order/add_purchase_order/"}
            >
              Add Purchase Order
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
        <ModalComponent modalStatus={modalActive} modalHandler={setModalActive}>
          <div>
            <h1 className="text-center mb-10 text-bold text-xl">
              Are you sure you want to cancel Purchase Order ID: {selectedId}
            </h1>
            <TextInput
              className="mb-10"
              label="Reason Of Cancelling Purchase Order"
              placeholder="Enter Here..."
              size="md"
              onChange={(e: any) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <div className="flex justify-end gap-10">
              <Button
                size="md"
                className="bg-red-500 hover:bg-red-900"
                onClick={() => setModalActive(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={modalCancelFunction}
                size="md"
                className="bg-blue-500"
                bg="blue"
              >
                Yes
              </Button>
            </div>
          </div>
        </ModalComponent>
      </main>
    </>
  );
};

export default PurchaseOrderPage;
