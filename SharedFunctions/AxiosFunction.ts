import axios from "axios";
import {getCookie} from "cookies-next";
// 
type axiosParams = {
    method: string;
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
    
  }:axiosParams)=>{
    const url = process.env.NEXT_PUBLIC_THIS_URL;
    var config:any = {
        method: method,
        url: `${url}${urlPath}`,
        headers: {
            Authorization: `Bearer ${getCookie("token")}`
        },
        data: data,
    }
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
}
export default axiosFunction;