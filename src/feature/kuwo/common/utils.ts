import { AxiosInstance } from "axios";
import parser from "set-cookie-parser";
export const addCookieInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use((res) => {
    const cookies = parser.parse(res.headers["set-cookie"] || "", {
      map: true,
    });
    instance.defaults.headers["csrf"] = cookies["kw_token"].value;
    instance.defaults.headers["Cookie"] = Object.values(cookies)
      .map((i) => `${i.name}=${i.value}`)
      .join("; ");
    return res;
  });
};
