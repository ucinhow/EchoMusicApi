import { SingerListResponse as RawSingerListResponse } from "./typing";
import { SingerListResponse } from "@/common/typing";

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
