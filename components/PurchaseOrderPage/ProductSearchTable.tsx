"use client";
//
import React from "react";
import DataTableComponent from "../Shared/DataTableComponent/DataTableComponent";
import UseVendorData from "../../modules/Vendor/UseVendorData";
//
type Props = {
  onChange: (val: any) => void;
  modalHandler: () => void;
};
//
const ProductSearchTable = (props: Props) => {
  const [vendorData, setVendorData]: any[] = UseVendorData();
  const [data, setData] = React.useState<any[]>([]);
  //

  React.useEffect(() => {
    var index = 0;
    var data_temp: any[] = [];
    vendorData.forEach((each_vendor: any) => {
      each_vendor.products.forEach((each_vendor_product: any) => {
        data_temp.push({
          key: index++,
          ...each_vendor,
          vendor_id: each_vendor.id,
          product_id: each_vendor_product.id,
          product_name: each_vendor_product.product_name,
        });
      });
    });
    setData(data_temp);
  }, [vendorData]);
  return (
    <DataTableComponent
      data={data}
      keyField={"key"}
      onRowClick={(row: any) => {
        const [selected_row] = vendorData.filter((each_vendor: any) => {
          return each_vendor.id == row.vendor_id;
        });

        props.onChange(JSON.stringify(selected_row));
        props.modalHandler();
      }}
      columns={[
        {
          name: "Product. ID",
          selector: (row: any) => <>{row.product_id}</>,
          grow: 0,
          center: true,
          width: "140px",
        },
        {
          name: "Product Name",
          selector: (row: any) => <>{row.product_name}</>,
          grow: 1,
        },
        {
          name: "Vendor. ID",
          selector: (row: any) => <>{row.vendor_id}</>,
          grow: 0,
          center: true,
          width: "140px",
        },
        {
          name: "Vendor Name",
          selector: (row: any) => <>{row.vendor_name}</>,
          grow: 1,
        },
      ]}
    />
  );
};

export default ProductSearchTable;
