import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "https://shopino.iran.liara.run/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 500,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.code) {
      case "ECONNABORTED": {
        toast.info("ارسال درخواست بیش از اندازه طول کشید");
        break;
      }
      case "ERR_NETWORK": {
        toast.info("اتصال اینترنت خود را بررسی کنید");
        break;
      }
    }

    switch (error.response.data.status) {
      case 401: {
        toast.info("کاربر لاگ اوت میباشد");
        break
      }
    }

    return Promise.reject(error);
  },
);

export default api;
