"use client";
import React from "react";
import UseCategoryData from "../../modules/Category/UseCategoryData";
import UseGrnData from "../../modules/Grn/UseGrnData";
import UseManufacturerData from "../../modules/Manufacturer/UseManufacturerData";
import UseProductData from "../../modules/Product/UseProductData";
import UsePurchaseOrderData from "../../modules/PurchaseOrder/UsePurchaseOrderData";
import UseVendorData from "../../modules/Vendor/UseVendorData";

type Props = {};

const DashboardPage = (props: Props) => {
  UseProductData();
  UseManufacturerData();
  UseCategoryData();
  UseVendorData();
  UsePurchaseOrderData();
  UseGrnData();
  return (
    <>
      <div className="p-5 flex w-[100%] justify-center items-center h-[calc(100vh_-_100px)]">
        <h1 className="text-[1.6rem]">
          Sorry!
          <br />
          <strong>This Page is under Development!</strong>
        </h1>
      </div>
    </>
  );
};

export default DashboardPage;
