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

const createDetailParams = (id: number, page: number, size: number) => ({
  req_1: {
    module: "musicToplist.ToplistInfoServer",
    method: "GetDetail",
    param: {
      topid: id,
      offset: (page - 1) * size,
      num: size,
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

export const queryToplistDetail = async (
  id: number,
  page: number,
  size: number
) => {
  const params = createDetailParams(id, page, size);
  return postMusics<
    ReturnType<typeof createDetailParams>,
    ToplistDetailResponse
  >(params);
};
export const toplistDetail = async (id: number, page: number, size: number) =>
  queryToplistDetail(id, page, size).then((res) =>
    serializeToplistDetail(res.data)
  );
