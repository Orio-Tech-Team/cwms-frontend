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
const axiosFunction = async ({
  method = "GET",
  urlPath = "",
  data = {},
  params = {},
}: axiosParams) => {
  const url = process.env.NEXT_PUBLIC_THIS_URL;
  // const url = "http://localhost:5000/dashboard";
  var config: any = {
    method: method,
    url: `${url}${urlPath}`,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: data,
  };
  if (method == "GET") {
    config["params"] = params;
  }
  //
  const result = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return result;
};
export default axiosFunction;
