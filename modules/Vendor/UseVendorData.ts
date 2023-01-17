import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import { VendorAtom } from "./VendorRecoil";

const UseVendorData = () => {
  const [data, setData] = useRecoilState(VendorAtom);
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/vendor/find_all" });
    setData(response.data);
  };
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);
  return [data, setData];
};

export default UseVendorData;
