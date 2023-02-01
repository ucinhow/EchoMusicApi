import { SingerDetail } from "@/common/typing";
import { parseSpace, parseTimestamp } from "@/common/utils";
import { DetailResponse } from "./typing";

export const serializeDetail = (res: DetailResponse): SingerDetail => {
  const {
    id,
    name,
    pic300: picUrl,
    birthday,
    info: desc,
    aartist: foreignName,
    birthplace,
    country,
    artistFans: fansCnt,
    musicNum: songCnt,
    albumNum: albumCnt,
  } = res.data;
  return {
    id: id.toString(),
    name: parseSpace(name),
    picUrl,
    birthday: parseTimestamp(birthday),
    desc: parseSpace(desc),
    foreignName: parseSpace(foreignName),
    birthplace,
    country: parseSpace(country),
    alias: parseSpace(foreignName),
    fansCnt,
    songCnt,
    albumCnt,
  };
};
