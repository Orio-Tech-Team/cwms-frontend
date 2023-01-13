"use client";
import React from "react";
import { localStorageClearFunction } from "../../../SharedFunctions/LocalStorageClearFunction";

type Props = {};
//
// qty x tp = total
// tp p disocunt lagy ga * quantity
// tp - disocunted us pe gst lagana hai 800 mai plus hoga

// total amount = total tp * total quantity
// total discount = total discount
// sales tax = gst * qty
// advance --
// net total amount + sales - total discount
//
type ProductType = {
  product_name: string;
  manufacturer: string;
  uom: string;
  required_quantity: number;
  trade_price: number;
  trade_discount: number;
  item_conversion: number;
  taxed_price: number;
  discounted_price: number;
  after_gst_price: number;
};
//
type InvoiceType = {
  vendor_name: string;
  address: string;
  city: string;
  ntn: string;
  strn: string;
  payment_terms: string;
  id: number;
  createdAt: string;
  expected_date: string;
  delivery_location: string;
  po_type: string;
  dataToSend: any[];
  order_type: string;
  total_required_quantity: number;
  total_trade_price: number;
  total_discount: number;
  sales_tax: number;
  advance_income: number;
};
//
const InvoiceComponent = (props: Props) => {
  const [invoiceData, setInvoiceData] = React.useState<InvoiceType>({
    address: "",
    city: "",
    createdAt: "",
    dataToSend: [],
    delivery_location: "",
    expected_date: "",
    id: 0,
    ntn: "",
    payment_terms: "",
    po_type: "",
    strn: "",
    vendor_name: "",
    order_type: "",
    total_required_quantity: 0,
    total_trade_price: 0,
    total_discount: 0,
    sales_tax: 0,
    advance_income: 0.0,
  });
  //
  React.useEffect(() => {
    const invoice_data_temp: InvoiceType = JSON.parse(
      localStorage.getItem("invoice_data")!
    );
    console.log(invoice_data_temp);

    //
    if (invoice_data_temp == undefined) {
      window.close();
    } else {
      var total_required_temp = invoice_data_temp.dataToSend.reduce(
        (acc: number, each_product: ProductType) =>
          acc + each_product.required_quantity,
        0
      );
      //
      var total_trade_price_temp = invoice_data_temp.dataToSend.reduce(
        (acc: number, each_product: ProductType) =>
          acc + each_product.trade_price,
        0
      );
      //
      const discounted_price_temp: any[] = invoice_data_temp.dataToSend.map(
        (each_product: ProductType) => {
          return {
            ...each_product,
            after_gst_price: +(
              (each_product.trade_price + each_product.taxed_price) *
              each_product.required_quantity
            ).toFixed(2),
            discounted_price: +(
              (each_product.trade_price * each_product.trade_discount) /
              100
            ).toFixed(2),
          };
        }
      );

      //
      var total_discount_temp = discounted_price_temp.reduce(
        (acc: number, each_product: ProductType) =>
          acc + each_product.discounted_price,
        0
      );
      //
      var sales_tax_temp = discounted_price_temp.reduce(
        (acc: number, each_product: ProductType) =>
          acc + each_product.after_gst_price,
        0
      );
      //
      setInvoiceData({
        ...invoice_data_temp,
        total_required_quantity: total_required_temp,
        total_trade_price: total_trade_price_temp,
        total_discount: total_discount_temp,
        sales_tax: sales_tax_temp,
        dataToSend: discounted_price_temp,
      });
      // localStorageClearFunction();
    }
  }, []);
  return (
    <>
      <section className="flex justify-center">
        <main className="w-[210mm]">
          <div></div>
          <div className="text-center text-[1.5rem] font-semibold">
            PURCHASE ORDER
          </div>
          <div className="text-[0.8rem] flex justify-between">
            <div className="min-w-[200px]">
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Vendor:</span>
                <span>{invoiceData.vendor_name}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Address:</span>
                <span>{invoiceData.address}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">City:</span>
                <span>{invoiceData.city}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">NTN:</span>
                <span>{invoiceData.ntn}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">STRN:</span>
                <span>{invoiceData.strn}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Payment Terms:</span>
                <span>{invoiceData.payment_terms}</span>
              </div>
            </div>
            <div className="min-w-[200px]">
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Number:</span>
                <span>{invoiceData.id}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Date:</span>
                <span>{invoiceData.createdAt.substring(0, 10)}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Delivery Date:</span>
                <span>{invoiceData.expected_date.substring(0, 10)}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Delivery Location:</span>
                <span>{invoiceData.delivery_location}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Type:</span>
                <span>{invoiceData.po_type}</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Sales Tax #:</span>
                <span>32423423543534-9</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">NTN:</span>
                <span>XXXX</span>
              </div>
            </div>
          </div>
          <div className="text-[0.8rem]">
            <table className="border border-black w-[100%] mt-5">
              <thead>
                <tr>
                  <th className="w-[20px] border border-black">#</th>
                  <th className="border border-black">Product</th>
                  <th className="w-[110px] border border-black">
                    Manufacturer
                  </th>
                  <th className="w-[75px] border border-black">Pack Size</th>
                  <th className="w-[65px] border border-black">UOM</th>
                  <th className="w-[40px] border border-black">Qty</th>
                  <th className="w-[55px] border border-black">T.P</th>
                  <th className="w-[85px] border border-black">Discount %</th>
                  <th className="w-[75px] border border-black">GST Value</th>
                  <th className="w-[85px] border border-black">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.dataToSend.map(
                  (each_product: ProductType, key: number) => {
                    return (
                      <tr className="border border-black" key={key}>
                        <td className="text-center border-r border-r-black">
                          {key + 1}
                        </td>
                        <td className="px-1 border-r border-r-black">
                          {each_product.product_name}
                        </td>
                        <td className="px-1 border-r border-r-black">
                          {each_product.manufacturer}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.item_conversion}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.uom}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.required_quantity}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.trade_price}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.trade_discount}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.taxed_price}
                        </td>
                        <td className="text-center border-r border-r-black">
                          {each_product.trade_price *
                            each_product.required_quantity}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="text-[0.8rem] font-semibold">
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border-l border-l-black">
                Total Amount
              </div>
              <div className="w-[85px] border-l border-l-black text-center">
                {invoiceData.total_required_quantity *
                  invoiceData.total_trade_price}
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border-l border-l-black">
                Total Discount
              </div>
              <div className="w-[85px] border-l border-l-black text-center">
                {invoiceData.total_discount}
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border-l border-l-black">
                Sales Tax
              </div>
              <div className="w-[85px] border-l border-l-black text-center">
                {invoiceData.sales_tax}
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border-l border-l-black">
                Advance Income Tax
              </div>
              <div className="w-[85px] border-l border-l-black text-center">
                {invoiceData.advance_income}
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Net Amount
              </div>
              <div className="w-[85px] border-l border-l-black text-center">
                {
                  +(
                    invoiceData.total_required_quantity *
                      invoiceData.total_trade_price +
                    invoiceData.sales_tax -
                    invoiceData.total_discount
                  ).toFixed(2)
                }
              </div>
            </div>
          </div>
          {invoiceData.order_type == "Advance" && (
            <p className="font-bold text-[0.8rem] mt-2">
              "This is an Advance Payment Purchase Order where the payment has
              been made in advance"
            </p>
          )}
        </main>
      </section>
    </>
  );
};

export default InvoiceComponent;
