import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CONFIG } from "../config";

interface AxiosProps {
  url: string;
  values?: any;
  apiHeaders?: any;
  method?: any;
  bearer?: any;
}

const AxiosProvider = ({
  method,
  apiHeaders,
  url,
  values,
  bearer,
}: AxiosProps) => {
  const headers = apiHeaders
    ? { ...apiHeaders, Authorization: bearer }
    : { Authorization: bearer };

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG.API_ENDPOINT,
    headers,
  });

  switch (method) {
    case "post":
      const PostCall = async (): Promise<AxiosResponse<any>> => {
        try {
          const response = await axiosInstance.post(url, values);

          return response;
        } catch (error) {
          throw error;
        }
      };
      return PostCall();
    case "get":
      const GetCall = async (): Promise<AxiosResponse<any>> => {
        try {
          const response = await axiosInstance.get(url);

          return response;
        } catch (error) {
          throw error;
        }
      };
      return GetCall();
  }
};

export default AxiosProvider;
