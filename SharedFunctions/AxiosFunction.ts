import axios from "axios";
import { getCookie } from "cookies-next";
//
type MethodType =
  | "POST"
  | "GET"
  | "PUT"
  | "DELETE"
  | "post"
  | "get"
  | "put"
  | "delete";
type axiosParams = {
  method?: MethodType;
  urlPath: string;
  data?: any;
  params?: any;
};
//

//
const axiosFunction = async ({
  method = "GET",
  urlPath = "",
  data = {},
  params = {},
}: axiosParams) => {
  const url = process.env.NEXT_PUBLIC_THIS_URL;
  // const url = "http://localhost:3001/dashboard";
  var config: any = {
    method: method,
    url: `${url}${urlPath}`,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "X-Custom-Header": JSON.stringify({
        acc_no: getCookie("acc_no"),
        loc_no: getCookie("loc_no"),
      }),
    },
    data: data,
  };
  if (method == "GET") {
    config["params"] = params;
  }
  //
  const result = await axios(config);
  if (result.data.status == 200) {
    return result.data;
  }
  console.log(result.data);
  return result.data;
};
export default axiosFunction;
