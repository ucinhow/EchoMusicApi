import { post, commParams, getSecuritySign } from "../common";
import { SingerListResponse } from "./typing";
import { serializeSingerList } from "./utils";
const allSingerParams = {
  req_0: {
    module: "music.musichallSinger.SingerList",
    method: "GetSingerListIndex",
    param: {
      area: -100,
      sex: -100,
      index: -100,
      genre: -100,
      cur_page: 1,
      sin: 0,
    },
  },
  comm: commParams,
};

export const querySingerList = () =>
  post<typeof allSingerParams, SingerListResponse>(
    allSingerParams,
    getSecuritySign(allSingerParams)
  ).then((res) => serializeSingerList(res.data));
