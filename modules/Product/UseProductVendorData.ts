import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { productVendorAtom } from "./ProductRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";

const UseProductVendorData = () => {
  const [data, setData] = useRecoilState(productVendorAtom);
  //
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/vendor/product_vendor/" });
    setData(response.data[0]);
  };
  //
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);

  return [data, setData];
};

export default UseProductVendorData;
