import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { LocationAtom } from "./LocationRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
import { getCookie } from "cookies-next";
//
const UseLocationData = () => {
  const [data, setData] = useRecoilState(LocationAtom);
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: `/get_location/${getCookie("account_number")}`,
    });
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
export default UseLocationData;
