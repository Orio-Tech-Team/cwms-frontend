"use client";
import React from "react";
import BreadcrumbComponent from "../Shared/BreadcrumbComponent/BreadcrumbComponent";
import ModalComponent from "../Shared/ModalComponent/ModalComponent";
import { Button, Select, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import UseVendorData from "../../modules/Vendor/UseVendorData";
import UseProductData from "../../modules/Product/UseProductData";
import UseLocationData from "../../modules/Location/UseLocationData";
import UseProductVendorData from "../../modules/Product/UseProductVendorData";
import NotificationComponent from "../Shared/NotificationComponent/NotificationComponent";
import {
  decimalNumberValidatorFunction,
  numberValidatorFunction,
} from "../../SharedFunctions/NumberValidator";
//icons
import { AiOutlineShoppingCart } from "react-icons/ai";
import UseProductConversionData from "../../modules/Product/UseProductConversionData";
//
type Props = {};
var addToCartDisabler = true;

const PurchaseOrderAddPage = (props: Props) => {
  const [vendorData, setVendorData]: Array<any> = UseVendorData();
  const [locationData, setLocationData]: Array<any> = UseLocationData();
  const [productData, setProductData]: Array<any> = UseProductData();
  const [productVendorData, setProductVendorData]: Array<any> =
    UseProductVendorData();
  const [productConversionData, setProductConversionData]: Array<any> =
    UseProductConversionData();
  // States
  const [orderedProducts, setOrderedProducts]: Array<any> = React.useState([]);
  const [selectedProducts, setSelectedProducts]: Array<any> = React.useState(
    []
  );
  const [subtotal, setSubtotal] = React.useState(0);
  const [subtotalDiscount, setSubtotalDiscount] = React.useState(0);
  const [totalTax, setTotalTax] = React.useState(0);
  //
  const [selectedVendor, setSelectedVendor]: any = React.useState({});
  const [tableFresher, setTableFresher] = React.useState(false);
  const tableFresherToggler = () => {
    setTableFresher((pre: boolean) => !pre);
  };
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
    isSuccess: true,
    trigger: false,
  });
  //
  const form = useForm({
    initialValues: {
      vendor_id: "",
      expected_delivery_date: new Date(),
      delivery_location: "",
      order_type: "",
    },
  });
  // tableInputHandler

  const tableInputHandler = (row: any, name: string, value: any) => {
    if (name === "unit_of_measurement" || name === "foc") {
      var temp_data_variable = [...selectedProducts];
      temp_data_variable[row.key] = {
        ...temp_data_variable[row.key],
        [name]: value,
      };
      setSelectedProducts(temp_data_variable);
      return;
    }
    if (name === "required_quantity") {
      numberValidatorFunction(value, (number_value: any) => {
        var temp_data_variable = [...selectedProducts];
        temp_data_variable[row.key] = {
          ...temp_data_variable[row.key],
          [name]: number_value,
        };
        setSelectedProducts(temp_data_variable);
      });
      return "";
    }
    decimalNumberValidatorFunction(value, (number_value: any) => {
      var temp_data_variable = [...selectedProducts];
      temp_data_variable[row.key] = {
        ...temp_data_variable[row.key],
        [name]: number_value,
      };
      setSelectedProducts(temp_data_variable);
    });
  };
  //Filter Product
  const selectedProductFilterer = (_id: number) => {
    var product_ids_temp: Array<any> = [];
    var selected_products_temp: Array<any> = [];
    var index_temp: number = -1;
    //
    productVendorData.forEach((each_product_vendor_data: any) => {
      if (each_product_vendor_data.vendorId === _id) {
        index_temp++;
        product_ids_temp.push({
          id: each_product_vendor_data.productId,
          key: index_temp,
        });
      }
    });
    //
    productData.forEach((each_product: any) => {
      product_ids_temp.forEach((each_id: any) => {
        if (each_id.id === each_product.id) {
          selected_products_temp.push({
            ...each_product,
            required_quantity: 0,
            unit_of_measurement: "",
            trade_price: "",
            trade_discount: "",
            foc: false,
            disabled: true,
            key: each_id.key,
          });
        }
      });
    });
    setSelectedProducts(selected_products_temp);
  };
  React.useEffect(() => {
    setSelectedProducts([]);
    if (form.getInputProps("vendor_id").value != "") {
      tableFresherToggler();
      selectedProductFilterer(form.getInputProps("vendor_id").value);
      vendorData.map((each_vendor: any, key: number) => {
        if (each_vendor.id === form.getInputProps("vendor_id").value) {
          setSelectedVendor(each_vendor);
        }
      });
    }
  }, [form.getInputProps("vendor_id").value]);

  // Row Select Function
  const rowSelectFunction = (row: any) => {
    var temp_data_variable = [...selectedProducts];
    var temp_data: Array<any> = [];

    temp_data_variable.map((each_data: any) => {
      temp_data.push({
        ...each_data,
        disabled: true,
      });
    });
    row.selectedRows.forEach((each_item: any) => {
      temp_data[each_item.key] = {
        ...temp_data[each_item.key],
        disabled: false,
      };
    });

    setSelectedProducts(temp_data);
    //
    if (row.selectedCount > 0) {
      addToCartDisabler = false;
    } else {
      addToCartDisabler = true;
    }
  };
  // Add to Cart Function
  const addToCartFunction = () => {
    var disabled_products_temp: any[] = [];
    var total_temp = 0;
    var total_discount_temp = 0;
    var tax_temp = 0;
    //
    selectedProducts.forEach((each_product: any, key: number) => {
      if (!each_product.disabled) {
        if (
          each_product.required_quantity === "" ||
          each_product.unit_of_measurement === ""
        ) {
          setNotification((pre) => {
            return {
              description: "Required Quantity and UOM cannot be empty!",
              title: "Error",
              isSuccess: false,
              trigger: true,
            };
          });
          return;
        }
        productConversionData.map((each_conversion: any) => {
          if (each_conversion.product_id === each_product.id) {
            total_temp =
              +total_temp +
              +(+each_product.trade_price * +each_product.required_quantity);
            //
            (total_discount_temp =
              +total_discount_temp +
              +(
                (+each_product.required_quantity *
                  +each_product.trade_price *
                  +each_product.trade_discount) /
                100
              )),
              (tax_temp =
                +tax_temp +
                +(
                  +(
                    +each_product.required_quantity *
                    +each_product.trade_price *
                    +each_product.sales_tax_percentage
                  ) / 100
                )),
              //
              disabled_products_temp.push({
                product_id: each_product.id,
                product_name: each_product.product_name,
                vendor_name: selectedVendor.vendor_name,
                sales_tax_percentage: each_product.sales_tax_percentage,
                required_quantity: each_product.required_quantity,
                item_conversion: each_conversion.item_conversion,
                manufacturer: each_product.manufacturer_name,
                unit_of_measurement: each_product.unit_of_measurement,
                trade_price: each_product.trade_price,
                trade_discount: each_product.trade_discount,
                foc: each_product.foc ? "Yes" : "No",
                total_price: (
                  +each_product.trade_price * +each_product.required_quantity
                ).toFixed(3),
                total_discount: (
                  (+each_product.required_quantity *
                    +each_product.trade_price *
                    +each_product.trade_discount) /
                  100
                ).toFixed(3),
                taxed_price: (
                  (+each_product.required_quantity *
                    +each_product.trade_price *
                    +each_product.sales_tax_percentage) /
                  100
                ).toFixed(3),
              });
          }
        });
      }
    });
    //
    orderedProducts.forEach((each_ordered_products: any) => {
      disabled_products_temp.forEach((each_disabled_product: any) => {
        console.log("Each Ordered Products: ", each_ordered_products);
        console.log("Each Disabled Products: ", each_disabled_product);

        if (
          each_ordered_products.product_id ===
            each_disabled_product.product_id &&
          each_ordered_products.foc != each_disabled_product.foc
        ) {
          console.log("Hello");
        }
      });
    });
    //
    setOrderedProducts(disabled_products_temp);
    setSubtotal(total_temp);
    setSubtotalDiscount(total_discount_temp);
    setTotalTax(tax_temp);
  };
  //
  const tableResetFunction = () => {
    form.reset();
    setSelectedVendor({});
    setSelectedProducts([]);
    setOrderedProducts([]);
    tableFresherToggler();
    setSubtotal(0);
    setSubtotalDiscount(0);
    setTotalTax(0);
    addToCartDisabler = true;
  };
  // submit Function
  const submitHandler = async () => {
    const dataToSend = {
      vendor_id: selectedVendor.id,
      vendor_name: selectedVendor.vendor_name,
      address: selectedVendor.business_address,
      city: selectedVendor.city,
      ntn: selectedVendor.ntn,
      advance_income: selectedVendor.tax_status === "Filer" ? "0.25" : "0.5",
      strn: selectedVendor.strn,
      payment_terms: selectedVendor.payment_terms,
      po_type: selectedVendor.vendor_classification,
      po_date: new Date(),
      delivery_date: form.getInputProps("expected_delivery_date").value,
      order_type: form.getInputProps("order_type").value,
      delivery_location: form.getInputProps("delivery_location").value,
      orders: orderedProducts,
    };
    console.log(dataToSend);
  };
  // Modal Work
  const [modalStatus, setModalStatus] = React.useState(false);
  const modalHandler = () => {
    setModalStatus((pre) => !pre);
  };
  //
  return (
    <>
      <main className="flex flex-col justify-center px-5 pb-7">
        <div className="mt-5 mb-7">
          <BreadcrumbComponent />
          <h1 className="font-semibold text-[1.5rem] text-[#3b3e66]">
            Add Purchase Order
          </h1>
          <p className="text-gray-500">
            Please see Add Purchase Order form below all connected channels
          </p>
        </div>
        <div className="shadow-xl border border-gray-100 rounded-md bg-white">
          <div className="flex justify-between items-center p-5 border-b-[1px]">
            <p className="font-semibold text-gray-500 py-2">
              Here you can manage your all Add Purchase Order!
            </p>
          </div>
          <form
            onSubmit={form.onSubmit(() => submitHandler())}
            className="p-5 flex flex-col gap-5"
          >
            <div className="flex gap-5">
              <Button
                type={"button"}
                onClick={modalHandler}
                className="bg-[#ee2a54] transition-all font-light text-md text-white w-56  hover:bg-[#ef0639]"
                disabled={form.getInputProps("vendor_id").value != ""}
              >
                Search Product
              </Button>
              <Button
                style={{
                  display:
                    form.getInputProps("vendor_id").value === ""
                      ? "none"
                      : "block",
                }}
                type={"reset"}
                onClick={tableResetFunction}
                className="bg-[#002884] transition-all font-light text-md text-white w-40  hover:bg-[#002884]"
              >
                Clear
              </Button>
            </div>
            <ModalComponent
              modalStatus={modalStatus}
              modalHandler={modalHandler}
            >
              <div>Hello</div>
            </ModalComponent>
            <div className="flex flex-wrap gap-5 justify-between">
              <Select
                className="w-[47%]"
                label="Vendor"
                placeholder="Select Vendor"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                disabled={form.getInputProps("vendor_id").value != ""}
                data={vendorData.map((each_item: any) => {
                  return { label: each_item.vendor_name, value: each_item.id };
                })}
                {...form.getInputProps("vendor_id")}
              />
              <DatePicker
                className="w-[47%]"
                placeholder="Select Date"
                label="Expected Delivery Date"
                required
                withAsterisk
                {...form.getInputProps("expected_delivery_date")}
              />
              <Select
                className="w-[47%]"
                label="Delivery Location"
                placeholder="Select Delivery Location"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                data={locationData.map((each_item: any) => {
                  return {
                    label: each_item.loc_name,
                    value: each_item.loc_name,
                  };
                })}
                {...form.getInputProps("delivery_location")}
              />
              <Select
                className="w-[47%]"
                label="Order Type"
                placeholder="Select Order Type"
                searchable
                nothingFound="No options"
                required
                withAsterisk
                data={["Normal", "Advance"]}
                {...form.getInputProps("order_type")}
              />
            </div>
            <div
              className={`rounded-md shadow-md transition-all ${
                selectedProducts.length != 0
                  ? "scale-100"
                  : "scale-0 h-0 overflow-hidden"
              }`}
            >
              <div className="p-5 flex border-b-2 justify-between items-center">
                <h2 className="font-semibold text-[1.2rem] text-[#3b3e66] ">
                  Product Table
                </h2>
                <Button
                  className="bg-red-500 flex justify-center items-center"
                  color={"red"}
                  type={"button"}
                  onClick={addToCartFunction}
                  disabled={addToCartDisabler}
                >
                  <span className="mr-2">Add To Cart</span>
                  <span>
                    <AiOutlineShoppingCart className="text-2xl" />
                  </span>
                </Button>
              </div>
              <DataTableComponent
                clearSelectedRows={tableFresher}
                selectableRows={true}
                onSelectedRowsChange={rowSelectFunction}
                columns={[
                  {
                    name: "ID",
                    selector: (row: any) => <>{row.id}</>,
                    grow: 0,
                    center: true,
                    width: "70px",
                  },
                  {
                    name: "Product Name",
                    selector: (row: any) => row.product_name,
                    grow: 2,
                    sortable: true,
                  },
                  {
                    name: "Sales Tax Percentage",
                    selector: (row: any) => (
                      <>{row.sales_tax_percentage || "0"}%</>
                    ),
                    grow: 0,
                    center: true,
                    width: "150px",
                  },
                  {
                    name: "Required Quantity",
                    cell: (row: any) => (
                      <TextInput
                        key={row.id}
                        placeholder={"Enter Required Quantity"}
                        size={"xs"}
                        disabled={row.disabled}
                        value={row.required_quantity}
                        onChange={(event: React.FormEvent<HTMLInputElement>) =>
                          tableInputHandler(
                            row,
                            "required_quantity",
                            event.currentTarget.value
                          )
                        }
                      />
                    ),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    center: true,
                    width: "150px",
                    grow: 0,
                  },
                  {
                    name: "UOM",
                    cell: (row: any) => (
                      <Select
                        key={row.id}
                        className=""
                        placeholder={"Select UOM"}
                        data={["Carton", "Box", "Pieces"]}
                        size={"xs"}
                        disabled={row.disabled}
                        value={row.unit_of_measurement}
                        onChange={(event: any) =>
                          tableInputHandler(row, "unit_of_measurement", event)
                        }
                      />
                    ),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    center: true,
                    width: "150px",
                    grow: 0,
                  },
                  {
                    name: "Trade Price",
                    cell: (row: any) => (
                      <TextInput
                        key={row.id}
                        placeholder={"Enter Trade Price"}
                        size={"xs"}
                        disabled={row.disabled}
                        value={row.trade_price}
                        onChange={(event: React.FormEvent<HTMLInputElement>) =>
                          tableInputHandler(
                            row,
                            "trade_price",
                            event.currentTarget.value
                          )
                        }
                      />
                    ),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    center: true,
                    width: "150px",
                    grow: 0,
                  },
                  {
                    name: "Trade Discount",
                    cell: (row: any) => (
                      <TextInput
                        key={row.id}
                        placeholder={"Enter Trade Discount"}
                        size={"xs"}
                        disabled={row.disabled}
                        value={row.trade_discount}
                        onChange={(event: React.FormEvent<HTMLInputElement>) =>
                          tableInputHandler(
                            row,
                            "trade_discount",
                            event.currentTarget.value
                          )
                        }
                      />
                    ),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    center: true,
                    width: "150px",
                    grow: 0,
                  },
                  {
                    name: "FOC",
                    cell: (row: any) => (
                      <Switch
                        size="md"
                        color="green"
                        className="cursor-pointer"
                        disabled={row.disabled}
                        checked={row.foc}
                        onChange={(event: any) =>
                          tableInputHandler(
                            row,
                            "foc",
                            event.currentTarget.checked
                          )
                        }
                      />
                    ),
                    allowOverflow: true,
                    center: true,
                    width: "90px",
                    grow: 0,
                  },
                ]}
                data={selectedProducts}
              />
            </div>
            <div className="rounded-md shadow-md">
              <h2 className="p-5 border-b-2 font-semibold text-[1.2rem] text-[#3b3e66]">
                Order Cart
              </h2>
              <DataTableComponent
                columns={[
                  {
                    name: "ID",
                    selector: (row: any) => <>{row.product_id}</>,
                    grow: 0,
                    center: true,
                    width: "70px",
                  },
                  {
                    name: "Product Name",
                    selector: (row: any) => row.product_name,
                    grow: 1,
                  },
                  {
                    name: "Vendor Name",
                    selector: (row: any) => row.vendor_name,
                    grow: 1,
                  },
                  {
                    name: "Sales Tax Percentage",
                    selector: (row: any) => (
                      <>{row.sales_tax_percentage || "0"}%</>
                    ),
                    grow: 0,
                    center: true,
                    width: "150px",
                  },
                  {
                    name: "Quantity",
                    selector: (row: any) => row.required_quantity,
                    grow: 0,
                    center: true,
                    width: "100px",
                  },
                  {
                    name: "Pack Size",
                    selector: (row: any) => row.item_conversion,
                    grow: 0,
                    center: true,
                    width: "90px",
                  },
                  {
                    name: "UOM",
                    selector: (row: any) => row.unit_of_measurement,
                    grow: 0,
                    center: true,
                    width: "80px",
                  },
                  {
                    name: "Trade Price",
                    selector: (row: any) => row.trade_price || "0",
                    grow: 0,
                    center: true,
                    width: "120px",
                  },
                  {
                    name: "Trade Discount",
                    selector: (row: any) => row.trade_discount || "0%",
                    grow: 0,
                    center: true,
                    width: "130px",
                  },
                  {
                    name: "FOC",
                    selector: (row: any) => row.foc,
                    grow: 0,
                    center: true,
                    width: "60px",
                  },
                  {
                    name: "Total Price",
                    selector: (row: any) => row.total_price,
                    grow: 0,
                    center: true,
                    width: "140px",
                  },
                  {
                    name: "Total Discount",
                    selector: (row: any) => row.total_discount,
                    grow: 0,
                    center: true,
                    width: "140px",
                  },
                ]}
                data={orderedProducts}
              />
            </div>
            <div className="ml-auto min-w-[400px]">
              <div className="flex justify-between">
                <span className="font-semibold">SubTotal:</span>
                <span>{subtotal.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Discounted Price:</span>
                <span>{subtotalDiscount.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax:</span>
                <span>{totalTax.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Grand Total:</span>
                <span>
                  {(subtotal + totalTax - subtotalDiscount).toFixed(3)}
                </span>
              </div>
            </div>
            <Button
              className="bg-[#002884] hover:bg-[#0e2762] w-[300px] ml-auto"
              type={"submit"}
              disabled={orderedProducts.length === 0}
            >
              Order
            </Button>
          </form>
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

export default PurchaseOrderAddPage;
