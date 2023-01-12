"use client";
import React from "react";

type Props = {};

const InvoiceComponent = (props: Props) => {
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
                <span>Vendor 1</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Address:</span>
                <span>Some Where</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">City:</span>
                <span>Karachi</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">NTN:</span>
                <span>1</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">STRN:</span>
                <span>12</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Payment Terms:</span>
                <span>15D</span>
              </div>
            </div>
            <div className="min-w-[200px]">
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Number:</span>
                <span>1043</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Date:</span>
                <span>Some Where</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Delivery Date:</span>
                <span>Karachi</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Delivery Location:</span>
                <span>1</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">PO Type:</span>
                <span>12</span>
              </div>
              <div className="flex gap-5 justify-between">
                <span className="font-bold">Sales Tax #:</span>
                <span>15D</span>
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
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div className="text-[0.8rem] font-semibold">
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Total Amount
              </div>
              <div className="w-[85px] border border-l-black text-center">
                202002
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Total Discount
              </div>
              <div className="w-[85px] border border-l-black text-center">
                202002
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Sales Tax
              </div>
              <div className="w-[85px] border border-l-black text-center">
                202002
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Advance Income Tax
              </div>
              <div className="w-[85px] border border-l-black text-center">
                202002
              </div>
            </div>
            <div className="flex justify-end border border-black border-t-0">
              <div />
              <div className="pl-1 w-[160px] border border-l-black">
                Net Amount
              </div>
              <div className="w-[85px] border border-l-black text-center">
                202002
              </div>
            </div>
          </div>
          <p className="font-bold text-[0.8rem] mt-2">
            "This is an Advance Payment Purchase Order where the payment has
            been made in advance"
          </p>
        </main>
      </section>
    </>
  );
};

export default InvoiceComponent;
