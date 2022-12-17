import { serializeToplistAll, serializeToplistDetail } from "./utils";
import { ToplistAllResponse, ToplistDetailResponse } from "./typing";
import { postMusics, commParams, getSecuritySign } from "../common";
// import { ToplistAllApi, ToplistDetailApi } from "@/common/typing/toplist";
import moment from "moment";
const toplistAllParams = {
  req_0: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetAll",
    param: {},
  },
  comm: { ...commParams, cv: 1770 },
};

const createDetailParams = (id: string, offset: number, num?: number) => ({
  req_0: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetDetail",
    param: { topid: id, offset, num, period: moment().format("YYYY-MM-DD") },
  },
  comm: {
    ...commParams,
    cv: 80500,
  },
});

export const queryToplistAll = () =>
  postMusics<typeof toplistAllParams, ToplistAllResponse>(toplistAllParams);

export const toplistAll = async () =>
  queryToplistAll().then((res) => serializeToplistAll(res.data));

export const queryToplistDetail = async (
  id: string,
  offset: number,
  num?: number
) => {
  const params = createDetailParams(id, offset, num);
  return postMusics<
    ReturnType<typeof createDetailParams>,
    ToplistDetailResponse
  >(params);
};
export const toplistDetail = async (id: string, offset: number, num?: number) =>
  queryToplistDetail(id, offset, num).then((res) =>
    serializeToplistDetail(res.data)
  );
