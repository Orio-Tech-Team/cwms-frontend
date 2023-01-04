import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { productConversionAtom } from "./ProductRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";

const UseProductConversionData = () => {
  const [data, setData] = useRecoilState(productConversionAtom);
  //
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/product/product_conversion/",
    });
    setData(response.data);
  };
  //
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);

  return [data, setData];
};

export default UseProductConversionData;
