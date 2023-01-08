import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { ManufacturerAtom } from "./ManufacturerRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const UseManufacturerData = () => {
  const [data, setData]: any[] = useRecoilState(ManufacturerAtom);
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/manufacturer/" });
    setData(response.data);
  };
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data?.length]);
  return [data, setData];
};
//
export default UseManufacturerData;
