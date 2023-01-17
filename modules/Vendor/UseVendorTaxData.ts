import React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { VendorTaxAtom } from "./VendorRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import duplicationRemoverFunction from "../../SharedFunctions/DuplicationRemoverFunction";

const UseVendorTaxData = () => {
  const [data, setData] = useRecoilState(VendorTaxAtom);
  const [withHoldTaxGroup, setWithHoldTaxGroup]: any[] = React.useState([]);
  const [withHoldTaxPercentage, setWithHoldTaxPercentage]: any[] =
    React.useState([]);
  const [salesTaxGroup, setSalesTaxGroup]: any[] = React.useState([]);
  const [salesTaxPercentage, setSalesTaxPercentage]: any[] = React.useState([]);
  //

  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/vendor/find_vendor_tax/",
    });

    //
    response.data.forEach((each_data: any) => {
      if (each_data.type === "with_hold") {
        setWithHoldTaxGroup((pre: any) => [...pre, each_data.tax_group]);
        setWithHoldTaxPercentage((pre: any) => [...pre, each_data.percentage]);
      } else {
        setSalesTaxGroup((pre: any) => [...pre, each_data.tax_group]);
        setSalesTaxPercentage((pre: any) => [...pre, each_data.percentage]);
      }
    });

    //
    setData(response.data);
  };
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    } else {
      data.forEach((each_data: any) => {
        if (each_data.type === "with_hold") {
          setWithHoldTaxGroup((pre: any) => [...pre, each_data.tax_group]);
          setWithHoldTaxPercentage((pre: any) => [
            ...pre,
            each_data.percentage,
          ]);
        } else {
          setSalesTaxGroup((pre: any) => [...pre, each_data.tax_group]);
          setSalesTaxPercentage((pre: any) => [...pre, each_data.percentage]);
        }
      });
    }
  }, [data.length]);
  return {
    withHoldTaxGroup: duplicationRemoverFunction(withHoldTaxGroup),
    withHoldTaxPercentage: duplicationRemoverFunction(withHoldTaxPercentage),
    salesTaxGroup: duplicationRemoverFunction(salesTaxGroup),
    salesTaxPercentage: duplicationRemoverFunction(salesTaxPercentage),
  };
};

export default UseVendorTaxData;
