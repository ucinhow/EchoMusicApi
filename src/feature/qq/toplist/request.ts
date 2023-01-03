import { serializeToplistAll, serializeToplistDetail } from "./utils";
import { ToplistAllResponse, ToplistDetailResponse } from "./typing";
import { postMusics, commParams } from "../common";
import { format } from "date-fns";

const toplistAllParams = {
  req_0: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetAll",
    param: {},
  },
  comm: { ...commParams, cv: 1770 },
};

const createDetailParams = (id: number) => ({
  req_1: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetDetail",
    param: {
      topid: id,
      offset: 0,
      num: 300,
    },
  },
  comm: {
    cv: 4747474,
    ct: 24,
    format: "json",
    inCharset: "utf-8",
    outCharset: "utf-8",
    // notice: 0,
    platform: "yqq.json",
    // needNewCode: 1,
    uin: 0,
  },
});

export const queryToplistAll = () =>
  postMusics<typeof toplistAllParams, ToplistAllResponse>(toplistAllParams);

export const toplistAll = async () =>
  queryToplistAll().then((res) => serializeToplistAll(res.data));

export const queryToplistDetail = async (id: number) => {
  const params = createDetailParams(id);
  return postMusics<
    ReturnType<typeof createDetailParams>,
    ToplistDetailResponse
  >(params);
};
export const toplistDetail = async (id: number) =>
  queryToplistDetail(id).then((res) => serializeToplistDetail(res.data));
