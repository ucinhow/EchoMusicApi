import { DEVELOPMENT_ENV, ERROR_MSG } from "@/common/constant";
import { Banners, DataType } from "@/common/typing";
import config from "@/config";
import { BannerResponse, JumpType } from "./typing";

export const serializeBanner = (res: BannerResponse): Banners => {
  const data = res.req_1.data.shelf.v_niche?.[0]?.v_card || [];
  return data.map((item) => {
    let id = "";
    let type = DataType.song;
    switch (item.jumptype) {
      case JumpType.songlist:
        id = item.id;
        type = DataType.songlist;
        break;
      case JumpType.album:
        id = item.subid;
        type = DataType.album;
        break;
      case JumpType.albumBuy:
        const reg = /mid=\w+/;
        id = item.id.match(reg)?.[0]?.slice(4) || "";
        type = DataType.album;
        break;
      case JumpType.mv:
        id = item.subid;
        type = DataType.mv;
        break;
      default:
        config.env === DEVELOPMENT_ENV && console.log(item.jumptype, item);
        throw new Error(ERROR_MSG.BannerJumpError);
    }
    return {
      id,
      picUrl: item.cover,
      type,
    };
  });
};
