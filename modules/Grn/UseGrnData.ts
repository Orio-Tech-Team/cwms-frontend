import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { GrnRecoil } from "./GrnRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const UseGrnData = () => {
  const [data, setData]: any[] = useRecoilState(GrnRecoil);
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/grn/find_all/" });
    setData(response.data);
  };
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);
  return [data, setData];
};
//
export default UseGrnData;
