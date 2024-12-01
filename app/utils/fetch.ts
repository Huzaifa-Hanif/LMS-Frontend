// import Axios from './apiService';
import { ApiResponse } from "../Interface/ApiResponse";
import toast from "react-hot-toast";
import Axios from "./axiosInstance";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const makeRequest = async <T>(
  url: string,
  method: Method,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const res = await Axios.request<T>({
      url,
      method,
      data: method !== Method.GET ? data : undefined,
    });

    const response: ApiResponse<T> = {
      success: true,
      data: res.data,
    };

    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    console.log(errorMessage, "error");
    toast.error(errorMessage);

    throw {
      success: false,
      message: errorMessage,
    };
  }
};

// import toast from "react-hot-toast";
// import { ApiResponse } from "../Interface/ApiResponse";

// export enum Method {
//   GET = "GET",
//   POST = "POST",
//   PUT = "PUT",
//   DELETE = "DELETE",
// }

// export const makeRequest = async <T>(
//   url: string,
//   method: Method,
//   data?: any
// ): Promise<ApiResponse<T>> => {
//   try {
//     const options: RequestInit = {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     if (method !== Method.GET && data) {
//       options.body = JSON.stringify(data);
//     }

//     const res = await fetch(url, options);
//     const response: ApiResponse<T> = {
//       success: res.ok,
//     };
//     if (!res.ok) {
//       const errorBody = await res.json();
//       console.log(errorBody, "errro");
//       response.message = errorBody || "An error occurred";
//       toast.error(errorBody);
//       throw response;
//     }

//     if (method === Method.DELETE || method === Method.PUT) {
//       response.message = "Success";
//       return response;
//     }

//     response.data = await res.json();
//     return response;
//   } catch (error) {
//     throw { success: false, message: error };
//   }
// };
