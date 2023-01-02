import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { PurchaseOrderAtom } from "./PurchaseOrderRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const UsePurchaseOrderData = () => {
  const [data, setData] = useRecoilState(PurchaseOrderAtom);
  const dataFetcher = async () => {
    var dataToSend: Array<any> = [];
    const response = await axiosFunction({ urlPath: "/product_order/" });
    const madeData = response.data.order_response.map((each_item: any) => {
      dataToSend = [];
      response.data.order_detail_response.map((each_detail: any) => {
        if (each_item.id === each_detail.po_id) {
          dataToSend.push(each_detail);
        }
      });
      return {
        ...each_item,
        dataToSend,
      };
    });
    setData(madeData);
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
