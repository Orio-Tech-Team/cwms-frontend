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
      urlPath: `/location/find_all/`,
      method: "POST",
      data: {
        account_number: getCookie("acc_no"),
      },
    });
    setData(response.data);
  };
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data]);
  return [data, setData];
};
//
export default UseLocationData;
