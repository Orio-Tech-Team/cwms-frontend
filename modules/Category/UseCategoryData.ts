import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { CategoryRecoil } from "./CategoryRecoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
//
const UseCategoryData = () => {
  const [data, setData]: any[] = useRecoilState(CategoryRecoil);
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/category/find_all/" });
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
export default UseCategoryData;
