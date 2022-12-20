import {
  SingerDetailResponse,
  SingerListResponse as RawSingerListResponse,
} from "./typing";
import { SingerDetail, SingerListResponse } from "@/common/typing";
import { parseTimestamp } from "@/common/utils";

export const serializeSingerList = (
  res: RawSingerListResponse
): SingerListResponse => {
  const data = res.req_0.data;
  return {
    area: data.area,
    sex: data.sex,
    genre: data.genre,
    singerList: data.singerlist.map((item) => ({
      areaId: item.area_id,
      id: item.singer_id,
      countryId: item.country_id,
      name: item.singer_name,
      country: item.country,
      alias: item.other_name,
      spell: item.spell,
      trend: item.trend,
      concernNum: item.concernNum,
      pic: item.singer_pic,
    })),
  };
};

export const serializeDetail = (res: SingerDetailResponse): SingerDetail => {
  const data = res.req_1.data.singer_list[0];
  const aliasReg =
    /<item><key><![CDATA[别名]]><\/key><value><![CDATA[(?<alias>.+)]]><\/value><\/item>/;
  const alias = aliasReg.exec(data.wiki)?.groups?.alias || "";
  const countryReg =
    /<item><key><![CDATA[国籍]]><\/key><value><![CDATA[(?<country>.+)]]><\/value><\/item>/;
  const country = countryReg.exec(data.wiki)?.groups?.country || "";
  const birthplaceReg =
    /<item><key><![CDATA[出生地]]><\/key><value><![CDATA[(?<birthplace>.+)]]><\/value><\/item>/;
  const birthplace = birthplaceReg.exec(data.wiki)?.groups?.birthplace || "";
  const occupationReg =
    /<item><key><![CDATA[职业]]><\/key><value><![CDATA[(?<occupation>.+)]]><\/value><\/item>/;
  const occupation = occupationReg.exec(data.wiki)?.groups?.occupation || "";
  return {
    // area: data.ex_info.area,
    id: data.basic_info.singer_mid,
    name: data.basic_info.name,
    picUrl: data.pic.pic,
    birthday: parseTimestamp(data.ex_info.birthday),
    desc: data.wiki,
    foreignName: data.ex_info.foreign_name,
    alias,
    country,
    birthplace,
    fansCnt:
      res.req_4.data.map_singer_num?.[data.basic_info.singer_mid]?.user_fansnum,
    songCnt: res.req_3.data.totalNum,
    albumCnt: res.req_2.data.total,
    occupation,
  };
};
