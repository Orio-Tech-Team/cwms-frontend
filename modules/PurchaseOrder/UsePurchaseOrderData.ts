import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { PurchaseOrderAtom } from "./PurchaseOrderRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const UsePurchaseOrderData = () => {
  const [data, setData] = useRecoilState(PurchaseOrderAtom);
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/purchase_order/find_all/",
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
export default UsePurchaseOrderData;
