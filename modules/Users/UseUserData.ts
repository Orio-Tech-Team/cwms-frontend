import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import axiosFunction from "../../SharedFunctions/AxiosFunction";
export const UserAtom = atom({
  key: "user_data",
  default: [],
});
//
export default function useUserData(): { userData: any[]; setUserData: any } {
  const [userData, setUserData] = useRecoilState(UserAtom);
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/user/find_all/",
    });
    setUserData(response.data);
  };
  useEffect(() => {
    if (userData.length === 0) {
      dataFetcher();
    }
  }, [userData.length]);
  return { userData, setUserData };
}
