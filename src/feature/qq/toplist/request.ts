import { serializeToplistAll, serializeToplistDetail } from "./utils";
import { ToplistAllResponse, ToplistDetailResponse } from "./typing";
import { post, commParams, getSecuritySign } from "../common";
import { ToplistAllApi, ToplistDetailApi } from "@/typing";
import moment from "moment";
const toplistAllParams = {
  req_0: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetAll",
    param: {},
  },
  comm: { ...commParams, cv: 1770 },
};

const createDetailParams = (id: number, num = 300) => ({
  req_0: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetDetail",
    param: { topid: id, num, period: moment().format("YYYY-MM-DD") },
  },
  comm: {
    ...commParams,
    cv: 80500,
  },
});

export const queryToplistAll: ToplistAllApi = () =>
  post<typeof toplistAllParams, ToplistAllResponse>(
    toplistAllParams,
    getSecuritySign(toplistAllParams)
  ).then((res) => serializeToplistAll(res.data));

export const queryToplistDetail: ToplistDetailApi = (id: number) => {
  const params = createDetailParams(id);
  return post<ReturnType<typeof createDetailParams>, ToplistDetailResponse>(
    params,
    getSecuritySign(params)
  ).then((res) => serializeToplistDetail(res.data));
};
