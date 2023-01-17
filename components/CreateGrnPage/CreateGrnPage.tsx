"use client";
import { Button, Progress, TextInput } from "@mantine/core";
import { BsTruck } from "react-icons/bs";
import React from "react";
//
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import { useForm } from "@mantine/form";
import {
  decimalNumberValidatorFunction,
  formValidator,
  numberValidatorFunction,
} from "../../SharedFunctions/NumberValidator";
import UsePurchaseOrderData from "../../modules/PurchaseOrder/UsePurchaseOrderData";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import { DatePicker } from "@mantine/dates";
import UseGrnData from "../../modules/Grn/UseGrnData";
import axiosFunction from "../../SharedFunctions/AxiosFunction";

type Props = {};

const CreateGrnPage = (props: Props) => {
  const [purchaseOrderData, setPurchaseOrderData]: any[] =
    UsePurchaseOrderData();
  const [grnData, setGrnData]: any[] = UseGrnData();
  //
  const [submitButtonDisabler, setSubmitButtonDisabler] = React.useState(false);
  const [percentOrderCompleted, setPercentOrderCompleted] = React.useState(100);
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  const [data, setData]: any[] = React.useState([]);
  //
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      purchase_order_id: "",
    },
    validate: (value) => ({
      purchase_order_id: formValidator(
        value.purchase_order_id,
        "purchase_order_id",
        "number"
      ),
    }),
  });
  // functions
  type InputPropType = "number" | "double";
  const tableInputHandler = (
    index: number,
    name: string,
    value: any,
    type?: InputPropType
  ) => {
    var data_temp = [...data];
    if (type === undefined) {
      data_temp[index] = { ...data_temp[index], [name]: value };
      setData(data_temp);
      return;
    }
    //
    if (type === "number") {
      numberValidatorFunction(value, (return_value) => {
        var flag_temp = false;
        if (name === "received_quantity") {
          if (+data_temp[index].required_quantity - +return_value < 0) {
            flag_temp = true;
          }
        }
        if (flag_temp) return;
        data_temp[index] = { ...data_temp[index], [name]: return_value };
        setData(data_temp);
        // progress-bar
        if (name === "received_quantity") {
          const total_required_quantity_temp = data_temp.reduce(
            (partial_sum: any, each_number: any) =>
              +partial_sum + +each_number.required_quantity,
            0
          );
          const total_received_quantity_temp = data_temp.reduce(
            (partial_sum: any, each_number: any) =>
              +partial_sum + +each_number.received_quantity,
            0
          );
          //
          setPercentOrderCompleted(
            +(
              +(+total_received_quantity_temp / +total_required_quantity_temp) *
              100
            ).toFixed(2)
          );
        }
        //
      });
      return;
    }
    //
    if (type === "double") {
      decimalNumberValidatorFunction(value, (return_value) => {
        data_temp[index] = { ...data_temp[index], [name]: return_value };
        setData(data_temp);
      });
      return;
    }
  };
  //
  const searchPurchaseOrderFunction = (_id: string) => {
    setPercentOrderCompleted(100);
    setSubmitButtonDisabler(false);
    var searched_purchase_order: any = {};
    var searched_grn_purchase_order: any[] = [];
    //
    [searched_purchase_order] = purchaseOrderData.filter(
      (each_purchase_order: any) => {
        return each_purchase_order.id == _id;
      }
    );
    //
    if (searched_purchase_order == undefined) {
      setNotification((pre: any) => ({
        description: "No Purchase Order Found!",
        title: "Not Found!",
        isSuccess: false,
        trigger: true,
      }));
      return;
    }
    //
    const { order_status } = searched_purchase_order;
    if (order_status != "Approved" && order_status != "Par-Received") {
      var order_status_temp = "Received";
      if (order_status === "Canceled") {
        order_status_temp == "Cancelled";
      }
      if (order_status === "Pending") {
        order_status_temp = "Pending for approval";
      }
      setNotification((pre: any) => ({
        description: `Purchase Order is ${order_status_temp}!`,
        title: "Error",
        isSuccess: false,
        trigger: true,
      }));
      return;
    }
    //
    searched_grn_purchase_order = grnData.filter((each_grn: any) => {
      return each_grn.po_id == _id;
    });
    //
    var is_in_grn_temp = false;
    if (searched_grn_purchase_order.length > 0) is_in_grn_temp = true;
    //
    if (!is_in_grn_temp) {
      if (searched_purchase_order.purchase_order_detail.length > 0) {
        var order_detail_temp: any[] = [];
        var index = 0;
        searched_purchase_order.purchase_order_detail.forEach(
          (each_detail: any) => {
            order_detail_temp.push({
              ...each_detail,
              index: index++,
              received_quantity: each_detail.required_quantity,
              discount_percentage: each_detail.trade_discount_percentage,
              maximum_retail_price: 0,
              batch_number: "",
              batch_expiry: new Date(),
              comments: "",
            });
          }
        );
        setData(order_detail_temp);
      }
      return;
    }

    if (is_in_grn_temp) {
      var index = 0;
      searched_grn_purchase_order = [];
      grnData.forEach((each_grn: any) => {
        if (each_grn.is_updatable) {
          searched_grn_purchase_order.push({
            index: index++,
            batch_expiry: new Date(each_grn.batch_expiry),
            ...each_grn,
          });
        }
      });
    }

    if (searched_grn_purchase_order.length == 0) {
      setNotification((pre: any) => ({
        description: `Purchase Order is waiting for QC Check!`,
        title: "Error",
        isSuccess: false,
        trigger: true,
      }));
    }
    setData(searched_grn_purchase_order);
    //

    //
    //
    // var index_temp = 0;
    // grnData.forEach((each_grn: any) => {
    //   if (_id == each_grn.po_id) {
    //     is_in_grn_temp = true;
    //     if (each_grn.is_updatable) {
    //       searched_grn_purchase_order.push({
    //         index: index_temp++,
    //         product_id: each_grn.product_id,
    //         product_name: each_grn.product_name,
    //         required_quantity: each_grn.remaining_quantity,
    //         received_quantity: each_grn.remaining_quantity,
    //         maximum_retail_price: each_grn.maximum_retail_price,
    //         trade_price: each_grn.trade_price,
    //         discount_percentage: each_grn.discount_percentage,
    //         batch_number: each_grn.batch_number,
    //         batch_expiry: each_grn.batch_expiry,
    //         foc: each_grn.foc ? "Yes" : "No",
    //         comments: each_grn.comments,
    //       });
    //     }
    //   }
    // });
    // //
    // if (searched_purchase_order === undefined) {
    //   setNotification((pre: any) => ({
    //     description: "No Purchase Order Found!",
    //     title: "Not Found!",
    //     isSuccess: false,
    //     trigger: true,
    //   }));
    //   return;
    // }
    // //
    // const { order_status } = searched_purchase_order;
    // if (order_status != "Approved" && order_status != "Par-Received") {
    //   var order_status_temp = "";
    //   if (order_status === "Pending") {
    //     order_status_temp = "Pending for approval";
    //   }
    //   setNotification((pre: any) => ({
    //     description: `Purchase Order is ${order_status_temp}!`,
    //     title: "Error",
    //     isSuccess: false,
    //     trigger: true,
    //   }));
    //   return;
    // }
    // //
    // if (is_in_grn_temp && searched_grn_purchase_order.length == 0) {
    //   setNotification((pre: any) => ({
    //     description: `Purchase Order is Completed!`,
    //     title: "Success",
    //     isSuccess: true,
    //     trigger: true,
    //   }));
    //   setData([]);
    //   return;
    // }
    // //
    // if (is_in_grn_temp) {
    //   setData(searched_grn_purchase_order);
    //   return;
    // }
    // //
    // var table_data_temp: any[] = [];
    // searched_purchase_order.dataToSend.forEach(
    //   (each_product_item: any, key: number) => {
    //     table_data_temp.push({
    //       index: key,
    //       product_id: each_product_item.product_id,
    //       product_name: each_product_item.product_name,
    //       required_quantity: each_product_item.required_quantity,
    //       received_quantity: each_product_item.required_quantity,
    //       maximum_retail_price: 0,
    //       trade_price: each_product_item.trade_price,
    //       discount_percentage: each_product_item.trade_discount,
    //       batch_number: "",
    //       batch_expiry: new Date(),
    //       comments: "",
    //       foc: each_product_item.foc,
    //     });
    //   }
    // );
    // setData(table_data_temp);
  };
  //
  const submitHandler = async () => {
    var is_empty_temp = false;
    data.forEach((each_data: any) => {
      if (
        each_data.received_quantity == "" ||
        each_data.maximum_retail_price == "" ||
        each_data.trade_price == ""
      ) {
        is_empty_temp = true;
      }
    });
    if (is_empty_temp) {
      setNotification({
        description: "Please fills mandatory fields!",
        title: "Error",
        isSuccess: false,
        trigger: true,
      });
      return;
    }

    setSubmitButtonDisabler(true);
    const data_to_send = {
      po_id: form.getInputProps("purchase_order_id").value,
      percent_order_completed: percentOrderCompleted,
      grn_data: data,
    };
    //
    const response = await axiosFunction({
      urlPath: "/grn/create/",
      method: "POST",
      data: data_to_send,
    });
    //
    setGrnData([]);
    //

    if (response.status == 200) {
      setNotification({
        description: "GRN Created/Updated Successfully!",
        title: "Success",
        isSuccess: true,
        trigger: true,
      });
    } else {
      setSubmitButtonDisabler(false);
      setNotification({
        description: "Error creating GRN!",
        title: "Error",
        isSuccess: false,
        trigger: true,
      });
    }
    //
  };
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Create GRN
          </h1>
          <p className="text-gray-500">
            Please see Create GRN form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all GRN!
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values: any) =>
              searchPurchaseOrderFunction(values.purchase_order_id)
            )}
            className="p-5 flex items-end gap-5"
          >
            <TextInput
              className="w-[47%]"
              placeholder="Enter Purchase Order ID To Search"
              size="md"
              label="Purchase Order ID"
              required
              withAsterisk
              icon={<BsTruck />}
              type={"text"}
              {...form.getInputProps("purchase_order_id")}
            />
            <Button
              type={"submit"}
              className="bg-red-500 w-36"
              color={"orange"}
              size="md"
            >
              Search
            </Button>
          </form>
          <div
            className={`p-5 flex flex-col gap-2 ${
              data.length === 0 && "hidden"
            }`}
          >
            <h2 className="font-semibold">
              {percentOrderCompleted}% Percent Order Completed!
            </h2>
            <Progress
              color="green"
              radius="md"
              size="xl"
              value={percentOrderCompleted}
              striped
            />
          </div>
          <DataTableComponent
            columns={[
              {
                name: "ID",
                selector: (row: any) => row.product_id,
                grow: 0,
                center: true,
                width: "66px",
              },
              {
                name: "Product Name",
                selector: (row: any) => row.product_name,
                grow: 1,
                sortable: true,
              },
              {
                name: "Req Quantity",
                selector: (row: any) => row.required_quantity,
                grow: 0,
                center: true,
                width: "120px",
              },
              {
                name: "UOM",
                selector: (row: any) => row.uom,
                grow: 0,
                center: true,
                width: "100px",
              },
              {
                name: "Rec Quantity",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.received_quantity}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "received_quantity",
                          e.target.value,
                          "number"
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "MPR",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.maximum_retail_price}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "maximum_retail_price",
                          e.target.value,
                          "double"
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "Trade Price",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.trade_price}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "trade_price",
                          e.target.value,
                          "double"
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "Discount %",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.discount_percentage}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "discount_percentage",
                          e.target.value,
                          "number"
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "Batch No.",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.batch_number}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "batch_number",
                          e.target.value
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },

              {
                name: "Batch Expiry",
                cell: (row: any) => (
                  <>
                    <DatePicker
                      className="table_date_picker"
                      size="xs"
                      value={row.batch_expiry}
                      onChange={(e: any) => {
                        tableInputHandler(row.index, "batch_expiry", e);
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "Comments",
                cell: (row: any) => (
                  <>
                    <TextInput
                      size="xs"
                      type="text"
                      value={row.comments}
                      onChange={(e: any) => {
                        tableInputHandler(
                          row.index,
                          "comments",
                          e.target.value
                        );
                      }}
                    />
                  </>
                ),
                center: true,
                width: "120px",
              },
              {
                name: "FOC",
                selector: (row: any) => (row.foc ? "Yes" : "No"),
                grow: 0,
                center: true,
                width: "70px",
              },
            ]}
            data={data}
          />
          <div className="p-5 w-100% flex">
            <Button
              disabled={submitButtonDisabler || data.length == 0}
              onClick={submitHandler}
              className="ml-auto bg-red-500 w-40"
              color={"orange"}
              size="md"
            >
              Submit
            </Button>
          </div>
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

export default CreateGrnPage;
